/**
 * Database target safety. Pure functions (no I/O, no aliases) so they can be
 * shared by Next.js runtime code, Playwright's config, CLI guards and tests.
 *
 * Branch layout on Neon: main = PRODUCTION (real trainee data), dev = copy of
 * production for dry-runs/imports, test = wiped by test:e2e:setup. Every Neon
 * branch has its own compute endpoint, so the *host* is what tells them apart:
 * all three share the database name "neondb".
 */

/**
 * Production host, host only, no credentials. Non-secret by design. Compared
 * after stripping Neon's "-pooler" suffix so the pooled and direct URLs of
 * the same endpoint both match.
 */
export const PRODUCTION_DB_HOST = "ep-red-mode-aur8z6oc.c-10.us-east-1.aws.neon.tech";

/** Set to PRODUCTION_DB_HOST to deliberately allow a production write. */
export const PRODUCTION_OVERRIDE_ENV = "ALLOW_PRODUCTION_DB_WRITE";

/**
 * Prefix of the variables the Vercel Neon Marketplace integration injects into
 * Production and Preview (LEARNING_DB_DATABASE_URL, LEARNING_DB_PGHOST, ...).
 * They cannot be cleanly removed, so their presence is only WARNED about. The
 * protection is that no source file may read one: see lib/no-legacy-env.test.ts.
 * (A generated client that read LEARNING_DB_DATABASE_URL instead of
 * DATABASE_URL is what once pointed "dev" at production.)
 *
 * This file is the only source file allowed to contain the prefix, and it must
 * read the process environment directly: it receives the environment as an argument.
 */
export const INTEGRATION_ENV_PREFIX = "LEARNING_DB_";

export interface DbTarget {
  host: string; // lower-case, "-pooler" removed
  database: string;
}

export interface DbEnv {
  DATABASE_URL?: string;
  DIRECT_URL?: string;
  [key: string]: string | undefined;
}

export function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/-pooler(?=\.)/, "");
}

/** Returns null for a missing or unparseable URL. Never returns credentials. */
export function parseDbTarget(url: string | undefined): DbTarget | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.hostname) return null;
    return { host: normalizeHost(u.hostname), database: decodeURIComponent(u.pathname.replace(/^\//, "")) };
  } catch {
    return null;
  }
}

export function describeTarget(t: DbTarget | null): string {
  return t ? `${t.host}/${t.database}` : "(missing or unparseable)";
}

export function isProductionTarget(t: DbTarget | null): boolean {
  return !!t && t.host === normalizeHost(PRODUCTION_DB_HOST);
}

export function sameTarget(a: DbTarget | null, b: DbTarget | null): boolean {
  return !!a && !!b && a.host === b.host && a.database === b.database;
}

export function productionOverrideActive(env: DbEnv): boolean {
  return env[PRODUCTION_OVERRIDE_ENV] === PRODUCTION_DB_HOST;
}

export type GuardRole =
  | "test" //           wipes/seeds: must not be prod, must not be .env's (dev) target
  | "not-production" // dev tooling: must not be prod, no override
  | "import" //         content import: prod only with the explicit override
  | "build"; //         `npm run build`: on Vercel Preview/Development, must not be prod

export interface GuardInput {
  role: GuardRole;
  /** The environment the script/server will actually run with. */
  env: DbEnv;
  /** Parsed contents of .env (not the process environment), or null if the file is absent. */
  dotEnv: DbEnv | null;
  /** Vercel's VERCEL_ENV: "production" | "preview" | "development" | undefined. */
  vercelEnv?: string;
}

/** Names (never values) of the integration-managed variables present, sorted. */
export function integrationVarNames(env: DbEnv, dotEnv: DbEnv | null): string[] {
  const names = new Set<string>();
  for (const source of [env, dotEnv ?? {}]) {
    for (const [name, value] of Object.entries(source)) {
      if (name.startsWith(INTEGRATION_ENV_PREFIX) && value !== undefined) names.add(name);
    }
  }
  return [...names].sort();
}

/**
 * Non-fatal notices for the guard to print. Currently: LEARNING_DB_* variables
 * are set. They are ignored, because nothing reads them and only DATABASE_URL
 * and DIRECT_URL decide where the app and the scripts connect.
 */
export function dbTargetWarnings(env: DbEnv, dotEnv: DbEnv | null): string[] {
  const names = integrationVarNames(env, dotEnv);
  if (names.length === 0) return [];
  const shown = names.slice(0, 3).join(", ") + (names.length > 3 ? ", ..." : "");
  return [
    `${names.length} ${INTEGRATION_ENV_PREFIX}* variable(s) are set (${shown}), managed by the Neon Marketplace integration. They are ignored: nothing reads them, and only DATABASE_URL and DIRECT_URL are used.`,
  ];
}

/**
 * Shown by every database-touching script when DATABASE_URL is not set. Cloud
 * sessions deliberately have no database and no credentials: anything that
 * reads or writes a database runs in GitHub Actions. Content needs no database
 * to be checked (`npm run validate:content`).
 */
export const NO_DATABASE_MESSAGE =
  "no database in this environment \u2014 use the GitHub Actions workflows (Import content to dev / production, E2E on test branch). To check content without a database run: npm run validate:content";

/** True when DATABASE_URL is unset or blank (a missing DIRECT_URL is a separate problem). */
export function noDatabaseConfigured(env: DbEnv): boolean {
  return !env.DATABASE_URL || env.DATABASE_URL.trim() === "";
}

/** Returns human-readable violations; empty means the target is acceptable. */
export function checkDbTarget({ role, env, dotEnv, vercelEnv }: GuardInput): string[] {
  // No database at all: one clear refusal instead of a list of URL complaints.
  // (The Vercel build keeps its detailed messages: it does have a database.)
  if (role !== "build" && noDatabaseConfigured(env)) return [NO_DATABASE_MESSAGE];

  const problems: string[] = [];
  const db = parseDbTarget(env.DATABASE_URL);
  const direct = parseDbTarget(env.DIRECT_URL);

  // Integration-managed LEARNING_DB_* variables are deliberately NOT a problem
  // (see dbTargetWarnings). A missing DATABASE_URL or DIRECT_URL still is, even
  // when a LEARNING_DB_* look-alike is present: nothing falls back to them.
  if (!db) problems.push("DATABASE_URL is missing or not a valid URL.");
  if (!direct) problems.push("DIRECT_URL is missing or not a valid URL (Prisma migrations need it).");
  if (db && direct && db.host !== direct.host) {
    problems.push(
      `DATABASE_URL (${describeTarget(db)}) and DIRECT_URL (${describeTarget(direct)}) point at different servers.`
    );
  }

  const targets = [db, direct].filter((t): t is DbTarget => !!t);
  const touchesProd = targets.some(isProductionTarget);

  switch (role) {
    case "not-production":
      if (touchesProd) problems.push(`Target is PRODUCTION (${PRODUCTION_DB_HOST}); this command never runs there.`);
      break;
    case "import":
      if (touchesProd && !productionOverrideActive(env)) {
        problems.push(
          `Target is PRODUCTION (${PRODUCTION_DB_HOST}). Refusing. To write deliberately, set ${PRODUCTION_OVERRIDE_ENV}=${PRODUCTION_DB_HOST} for that one run, after a fresh pg_dump.`
        );
      }
      break;
    case "build":
      // Vercel Production may migrate prod. Anything else must not touch it.
      if (touchesProd && vercelEnv !== "production") {
        problems.push(
          `A ${vercelEnv ?? "local"} build points at PRODUCTION (${PRODUCTION_DB_HOST}). Preview/Development must use the dev branch.`
        );
      }
      break;
    case "test": {
      if (touchesProd) problems.push(`Test target is PRODUCTION (${PRODUCTION_DB_HOST}). Refusing.`);
      const devTargets = [parseDbTarget(dotEnv?.DATABASE_URL), parseDbTarget(dotEnv?.DIRECT_URL)];
      for (const t of targets) {
        if (devTargets.some((d) => sameTarget(t, d))) {
          problems.push(`Test target ${describeTarget(t)} is the same as the one in .env (dev). It must be the separate test branch.`);
        }
      }
      break;
    }
  }
  return [...new Set(problems)];
}

/**
 * Runtime tripwire for the app itself (lib/db.ts). Production is reachable
 * only from a Vercel Production deployment, or with the explicit override.
 * Preview deployments and local `next dev`/`next start` can never open it.
 */
export function checkRuntimeTarget(env: DbEnv, vercelEnv: string | undefined): string[] {
  const db = parseDbTarget(env.DATABASE_URL);
  if (!isProductionTarget(db)) return [];
  if (vercelEnv === "production" || productionOverrideActive(env)) return [];
  return [
    `DATABASE_URL points at PRODUCTION (${PRODUCTION_DB_HOST}) but this is ${vercelEnv ? `a Vercel ${vercelEnv} deployment` : "not a Vercel Production deployment"}. Refusing to connect.`,
  ];
}
