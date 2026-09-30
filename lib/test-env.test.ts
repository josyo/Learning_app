import { describe, expect, it } from "vitest";
import { resolveTestEnv } from "./test-env";

describe("resolveTestEnv", () => {
  it("uses .env.test when the file exists and ignores the process environment", () => {
    const r = resolveTestEnv({ DATABASE_URL: "from-file" }, { DATABASE_URL: "from-process" });
    expect(r).toEqual({ env: { DATABASE_URL: "from-file" }, source: ".env.test" });
  });

  it("without a file (cloud session), takes only the known variables from the process environment", () => {
    const r = resolveTestEnv(null, {
      DATABASE_URL: "a",
      DIRECT_URL: "b",
      BETTER_AUTH_SECRET: "c",
      SEED_USER_PASSWORD: "d",
      PATH: "/usr/bin",
      ANTHROPIC_API_KEY: "must-not-be-copied",
    });
    expect(r.source).toBe("process environment");
    expect(r.env).toEqual({ DATABASE_URL: "a", DIRECT_URL: "b", BETTER_AUTH_SECRET: "c", SEED_USER_PASSWORD: "d" });
  });

  it("without a file and without variables, the result is empty so the target check reports what is missing", () => {
    expect(resolveTestEnv(null, {}).env).toEqual({});
  });
});
