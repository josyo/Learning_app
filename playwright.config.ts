import fs from "node:fs";
import path from "path";
import { defineConfig, devices } from "@playwright/test";
import { config as loadEnv } from "dotenv";

// Deliberately .env.test, not .env.local — E2E runs against a
// separate, disposable database (see .env.test.example) so this
// suite can never touch real dev data. Missing .env.test is a
// configuration error, not a fall-through to the real database.
const testEnvPath = path.resolve(__dirname, ".env.test");
if (!fs.existsSync(testEnvPath)) {
  throw new Error(
    "Missing .env.test for Playwright. Create it from env.test.example before running npm run test:e2e."
  );
}
const testEnv = loadEnv({ path: testEnvPath }).parsed ?? {};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false, // these tests share seeded accounts and mutate real data — run sequentially
  retries: 0,
  timeout: 60_000, // default is 30s — too tight for a cold Next.js dev-mode compile on a slower machine
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
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
    timeout: 60_000,
    env: testEnv,
  },
});