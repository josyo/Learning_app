/**
 * CI check: the secrets in a GitHub environment point where that environment
 * claims. Catches a dev URL pasted into the production environment (or the
 * reverse) before any import runs.
 *
 *   tsx scripts/assert-db-target.ts <production|dev|test>
 *
 * Prints host and database only, never credentials.
 */
import { describeTarget, isProductionTarget, parseDbTarget } from "../lib/db-targets";

/** Neon endpoint id of the dev branch (see CLAUDE.md, gotcha 13). Non-secret. */
const DEV_ENDPOINT_ID = "ep-silent-band-aup0hqps";

/** Neon endpoint id of the test branch (disposable, reset by test:e2e:setup). Non-secret. */
const TEST_ENDPOINT_ID = "ep-green-bread-aue0kwbf";

const expected = process.argv[2];
if (expected !== "production" && expected !== "dev" && expected !== "test") {
  console.error('assert-db-target: pass "production", "dev" or "test".');
  process.exit(2);
}

const problems: string[] = [];
for (const name of ["DATABASE_URL", "DIRECT_URL"] as const) {
  const t = parseDbTarget(process.env[name]);
  if (!t) {
    problems.push(`${name} is missing or not a valid URL.`);
    continue;
  }
  console.log(`${name} -> ${describeTarget(t)}`);
  if (expected === "production" && !isProductionTarget(t)) problems.push(`${name} is not the production endpoint.`);
  if (expected === "dev") {
    if (isProductionTarget(t)) problems.push(`${name} is the PRODUCTION endpoint. The dev environment must never hold it.`);
    else if (!t.host.startsWith(`${DEV_ENDPOINT_ID}.`)) problems.push(`${name} is not the dev endpoint (${DEV_ENDPOINT_ID}).`);
  }
  if (expected === "test") {
    if (isProductionTarget(t)) problems.push(`${name} is the PRODUCTION endpoint. The test environment must never hold it.`);
    else if (!t.host.startsWith(`${TEST_ENDPOINT_ID}.`)) problems.push(`${name} is not the test endpoint (${TEST_ENDPOINT_ID}).`);
  }
}
if (problems.length > 0) {
  console.error(`assert-db-target [${expected}] REFUSED:\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log(`assert-db-target [${expected}] ok.`);
