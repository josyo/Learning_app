/**
 * Settings for running the operator scripts (importer, row counts, learner-view
 * check) over a slow link, for example from Lagos to Neon in us-east-1 where
 * every round trip costs 150-250 ms. Pure; no I/O.
 *
 * Prisma's defaults assume a database next to the app:
 *  - an interactive transaction times out after 5000 ms in total, and waits at
 *    most 2000 ms to start (a loop of one query per table blew the 5s limit);
 *  - opening a connection gives up after connect_timeout = 5 s (Prisma docs),
 *    which a slow TLS handshake plus a Neon compute wake-up can exceed;
 *  - waiting for a pooled connection gives up after pool_timeout = 10 s.
 *
 * The app on Vercel runs next to the database and keeps Prisma's defaults;
 * only the scripts use these.
 */

/** Options for every interactive `$transaction(async (tx) => ...)` in a script. */
export const SLOW_TX_OPTIONS = { timeout: 60_000, maxWait: 30_000 } as const;

const SLOW_LINK_PARAMS: Record<string, string> = { connect_timeout: "30", pool_timeout: "30" };

/**
 * Adds connect_timeout and pool_timeout to a connection string unless the URL
 * already sets them (an explicit choice always wins). Other parameters, such as
 * sslmode and channel_binding, are preserved. Returns the input unchanged if it
 * is missing or not a parseable URL.
 */
export function withSlowLinkParams(url: string | undefined): string | undefined {
  if (!url) return url;
  try {
    const u = new URL(url);
    for (const [key, value] of Object.entries(SLOW_LINK_PARAMS)) {
      if (!u.searchParams.has(key)) u.searchParams.set(key, value);
    }
    return u.toString();
  } catch {
    return url;
  }
}
