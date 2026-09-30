/**
 * Which base URL and trusted origins Better Auth uses, decided from the
 * environment. Pure (no I/O) so it can be unit-tested.
 *
 * - Production and local: unchanged. `BETTER_AUTH_URL` (else localhost) is the
 *   base URL; it, `VERCEL_URL` and `BETTER_AUTH_TRUSTED_ORIGINS` are trusted.
 * - Vercel Preview: every preview has its own host, so a fixed `BETTER_AUTH_URL`
 *   (which may still be the production URL, or unset) is ignored. The base URL is
 *   the branch URL (`VERCEL_BRANCH_URL`, the stable per-branch alias) and both it
 *   and the deployment URL (`VERCEL_URL`) are trusted, because either one can be
 *   the address you open. Without this, sign-in on a preview fails Better Auth's
 *   origin check.
 */
export interface AuthOrigins {
  baseURL: string;
  trustedOrigins: string[];
}

type Env = Record<string, string | undefined>;

const https = (host: string | undefined) => (host ? `https://${host}` : undefined);

export function resolveAuthOrigins(env: Env): AuthOrigins {
  const extra = env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];
  const unique = (xs: (string | undefined)[]) => Array.from(new Set(xs.filter(Boolean) as string[]));

  if (env.VERCEL_ENV === "preview") {
    const hosts = unique([https(env.VERCEL_BRANCH_URL), https(env.VERCEL_URL)]);
    const [first] = hosts;
    if (first) {
      return { baseURL: first, trustedOrigins: unique([...hosts, ...extra]) };
    }
  }

  return {
    baseURL: env.BETTER_AUTH_URL ?? "http://localhost:3000",
    trustedOrigins: unique([env.BETTER_AUTH_URL, https(env.VERCEL_URL), ...extra]),
  };
}
