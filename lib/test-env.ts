/**
 * The environment the Playwright web server (and the E2E run) uses.
 *
 * - Local: `.env.test` (the Neon test branch), exactly as before.
 * - Cloud sessions have no env files. There the same variables come from the
 *   process environment, and only these names are passed on.
 *
 * Either way the result goes through checkDbTarget({ role: "test" }), which
 * accepts only the test endpoint.
 */
export const TEST_ENV_KEYS = [
  "DATABASE_URL",
  "DIRECT_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "SEED_USER_PASSWORD",
  "SEED_PASSWORD",
  "SEED_ADMIN_PASSWORD",
  "SEED_MENTOR_PASSWORD",
  "SEED_TRAINEE_PASSWORD",
] as const;

export interface ResolvedTestEnv {
  env: Record<string, string>;
  source: ".env.test" | "process environment";
}

/** `fileEnv` is the parsed .env.test, or null when the file does not exist. */
export function resolveTestEnv(fileEnv: Record<string, string> | null, processEnv: Record<string, string | undefined>): ResolvedTestEnv {
  if (fileEnv) return { env: fileEnv, source: ".env.test" };
  const env: Record<string, string> = {};
  for (const key of TEST_ENV_KEYS) {
    const value = processEnv[key];
    if (value) env[key] = value;
  }
  return { env, source: "process environment" };
}
