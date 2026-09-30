/**
 * CLI guard, run before anything that seeds, resets, migrates or imports.
 *
 *   tsx scripts/db-guard.ts <test|not-production|import|build>
 *
 * It inspects the environment the *next* command will run with (so under
 * `dotenv -e .env.test -- tsx scripts/db-guard.ts test` that is the test
 * branch), compares it with what .env (dev) says, and with the production
 * host constant. It prints host/database only, never credentials.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "dotenv";
import { checkDbTarget, dbTargetWarnings, describeTarget, parseDbTarget, type DbEnv, type GuardRole } from "../lib/db-targets";

const ROLES: GuardRole[] = ["test", "not-production", "import", "build"];
const role = process.argv[2] as GuardRole;

if (!ROLES.includes(role)) {
  console.error(`db-guard: unknown role "${process.argv[2]}". Use one of: ${ROLES.join(", ")}`);
  process.exit(2);
}

const dotEnvPath = path.resolve(__dirname, "..", ".env");
const dotEnv: DbEnv | null = fs.existsSync(dotEnvPath) ? parse(fs.readFileSync(dotEnvPath)) : null;

// What the next command really sees: Prisma and Next load .env without
// overriding variables already set, so the effective view is .env underneath
// the process environment (dotenv-cli puts .env.test in the process env).
// A variable missing from .env.test therefore falls back to dev, and the
// guard sees that.
const effectiveEnv = { ...(dotEnv ?? {}), ...process.env } as DbEnv;

const problems = checkDbTarget({
  role,
  env: effectiveEnv,
  dotEnv,
  vercelEnv: process.env.VERCEL_ENV,
});

const target = describeTarget(parseDbTarget(effectiveEnv.DATABASE_URL));

// Notices that never fail the guard (e.g. the variables Vercel's Neon integration
// injects and cannot remove). Printed either way, names only, never values.
for (const w of dbTargetWarnings(effectiveEnv, dotEnv)) console.warn(`db-guard [${role}] warning: ${w}`);

if (problems.length > 0) {
  console.error(`\ndb-guard [${role}] REFUSED. Target: ${target}`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error("");
  process.exit(1);
}
console.log(`db-guard [${role}] ok. Target: ${target}`);
