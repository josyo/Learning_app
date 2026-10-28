import fs from "node:fs";
import path from "path";
import { defineConfig, devices } from "@playwright/test";
import { config as loadEnv, parse as parseEnv } from "dotenv";
import { NO_DATABASE_MESSAGE, checkDbTarget, describeTarget, noDatabaseConfigured, parseDbTarget } from "./lib/db-targets";

// Deliberately .env.test, not .env.local — E2E runs against a separate,
// disposable database (see env.test.example) so this suite can never touch
// real dev data. Locally the values come from .env.test. In GitHub Actions
// there is no file: the "E2E on test branch" workflow puts the test-branch
// values in the process environment, and they are used as they are. With
// neither, this is a configuration error, never a fall-through to a real
// database (cloud sessions have no database at all).
const testEnvPath = path.resolve(__dirname, ".env.test");
const TEST_ENV_KEYS = ["DATABASE_URL", "DIRECT_URL", "BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "SEED_USER_PASSWORD"];
const testEnv: Record<string, string> = fs.existsSync(testEnvPath)
  ? (loadEnv({ path: testEnvPath }).parsed ?? {})
  : Object.fromEntries(TEST_ENV_KEYS.flatMap((k) => (process.env[k] ? [[k, process.env[k] as string]] : [])));
if (noDatabaseConfigured(testEnv)) {
  throw new Error(`Playwright refused to start: ${NO_DATABASE_MESSAGE}`);
}

// Refuse to run at all unless the test target is a separate database: not
// production, and not the dev target in .env. Runs when the config loads, so
// it also covers `npx playwright test` invoked directly. It checks testEnv
// (what the webServer is given), not process.env.
const dotEnvPath = path.resolve(__dirname, ".env");
const dotEnv = fs.existsSync(dotEnvPath) ? parseEnv(fs.readFileSync(dotEnvPath)) : null;
// Next.js loads .env under whatever the webServer is given, so a key missing
// from .env.test would silently fall back to dev. Check that merged view.
const effectiveTestEnv = { ...(dotEnv ?? {}), ...testEnv };
const targetProblems = checkDbTarget({ role: "test", env: effectiveTestEnv, dotEnv });
if (targetProblems.length > 0) {
  throw new Error(
    `Playwright refused to start. Unsafe database target (${describeTarget(parseDbTarget(effectiveTestEnv.DATABASE_URL))}):\n - ${targetProblems.join("\n - ")}`
  );
}

// Every run writes to its own folder, so a rerun never overwrites the evidence
// of the run before it (Playwright wipes its default test-results/ and
// playwright-report/ at the start of each run). The id is set once, in the main
// process, and inherited by the workers that load this file again. Folders are
// git-ignored; delete old ones by hand when they pile up.
process.env.E2E_RUN_ID ??= new Date().toISOString().replace(/[:.]/g, "-");
const runDir = path.resolve(__dirname, "e2e-runs", process.env.E2E_RUN_ID);

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  outputDir: path.join(runDir, "artifacts"),
  fullyParallel: false, // these tests share seeded accounts and mutate real data — run sequentially
  retries: 0,
  timeout: 60_000, // default is 30s — too tight for a cold Next.js dev-mode compile on a slower machine
  reporter: [
    ["list"],
    ["html", { outputFolder: path.join(runDir, "report"), open: "never" }],
    ["json", { outputFile: path.join(runDir, "results.json") }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    // retries are 0 (the specs mutate data), so "on-first-retry" never fired.
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    navigationTimeout: 45_000, // specifically covers the page.goto that hit the cold-compile wall
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    // reuseExistingServer is deliberately false here — an already-
    // running `npm run dev` (from your own terminal) is pointed at
    // your real dev database via .env.local, not .env.test. Reusing
    // it would silently run E2E tests against real data despite
    // everything above. Playwright always launches its own server
    // for this project, with testEnv layered on top to redirect it.
    reuseExistingServer: false,
    timeout: 180_000, // a cold `next dev` start on a slow machine
    env: testEnv,
  },
});