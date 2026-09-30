import { describe, expect, it } from "vitest";
import {
  PRODUCTION_DB_HOST,
  PRODUCTION_OVERRIDE_ENV,
  TEST_ENDPOINT_ID,
  checkDbTarget,
  checkRuntimeTarget,
  dbTargetWarnings,
  integrationVarNames,
  parseDbTarget,
} from "./db-targets";

const url = (host: string, db = "neondb") => `postgresql://u:secret@${host}/${db}?sslmode=require`;
const DEV = "ep-dev-000000.c-10.us-east-1.aws.neon.tech";
const TEST = `${TEST_ENDPOINT_ID}.c-10.us-east-1.aws.neon.tech`;
const withPooler = (h: string) => h.replace(/^(ep-[^.]+)/, "$1-pooler");

const envFor = (host: string) => ({ DATABASE_URL: url(withPooler(host)), DIRECT_URL: url(host) });
const devDotEnv = envFor(DEV);

describe("parseDbTarget", () => {
  it("strips -pooler so pooled and direct URLs match, and never exposes credentials", () => {
    const t = parseDbTarget(url(withPooler(PRODUCTION_DB_HOST)));
    expect(t).toEqual({ host: PRODUCTION_DB_HOST, database: "neondb" });
    expect(JSON.stringify(t)).not.toContain("secret");
  });
  it("returns null for missing or garbage input", () => {
    expect(parseDbTarget(undefined)).toBeNull();
    expect(parseDbTarget("not a url")).toBeNull();
  });
});

describe("checkDbTarget", () => {
  it("test role: accepts a separate test branch", () => {
    expect(checkDbTarget({ role: "test", env: envFor(TEST), dotEnv: devDotEnv })).toEqual([]);
  });
  it("test role, no .env file (cloud session): accepts the test endpoint from process env alone", () => {
    expect(checkDbTarget({ role: "test", env: envFor(TEST), dotEnv: null })).toEqual([]);
  });
  it("test role, no .env file: still refuses the dev endpoint, because it is not the test endpoint", () => {
    const p = checkDbTarget({ role: "test", env: envFor(DEV), dotEnv: null });
    expect(p.join()).toMatch(/not the test endpoint/);
  });
  it("test role, no .env file: refuses production", () => {
    expect(checkDbTarget({ role: "test", env: envFor(PRODUCTION_DB_HOST), dotEnv: null }).join()).toMatch(/PRODUCTION/);
  });
  it("test role: refuses production (pooled or direct)", () => {
    const p = checkDbTarget({ role: "test", env: envFor(PRODUCTION_DB_HOST), dotEnv: devDotEnv });
    expect(p.join()).toMatch(/PRODUCTION/);
  });
  it("test role: refuses the same target as .env even when only the pooler differs", () => {
    const p = checkDbTarget({ role: "test", env: envFor(DEV), dotEnv: devDotEnv });
    expect(p.join()).toMatch(/same as the one in \.env/);
  });
  it("test role: refuses when DIRECT_URL is missing (Prisma would fall back to .env's)", () => {
    const p = checkDbTarget({ role: "test", env: { DATABASE_URL: url(TEST) }, dotEnv: devDotEnv });
    expect(p.join()).toMatch(/DIRECT_URL is missing/);
  });
  it("refuses when DATABASE_URL and DIRECT_URL point at different servers", () => {
    const p = checkDbTarget({
      role: "test",
      env: { DATABASE_URL: url(TEST), DIRECT_URL: url(DEV) },
      dotEnv: devDotEnv,
    });
    expect(p.join()).toMatch(/different servers/);
  });
  describe("integration-managed LEARNING_DB_* variables (Vercel Neon Marketplace integration)", () => {
    // Roughly what the integration injects, with distinctive values so a leak would show.
    const names = [
      "DATABASE_URL", "DATABASE_URL_UNPOOLED", "POSTGRES_URL", "POSTGRES_URL_NON_POOLING", "POSTGRES_PRISMA_URL",
      "POSTGRES_URL_NO_SSL", "POSTGRES_USER", "POSTGRES_HOST", "POSTGRES_PASSWORD", "POSTGRES_DATABASE",
      "PGHOST", "PGHOST_UNPOOLED", "PGUSER", "PGPASSWORD", "PGDATABASE", "NEON_AUTH_BASE_URL",
      "NEON_AUTH_JWKS_URL", "NEON_PROJECT_ID", "NEON_BRANCH_ID", "NEON_API_KEY",
    ];
    const integration = Object.fromEntries(names.map((n) => [`LEARNING_DB_${n}`, "integration-value-do-not-print"]));

    it("does not fail the guard, in the process env or in .env, for any role", () => {
      for (const role of ["not-production", "import", "build"] as const) {
        expect(checkDbTarget({ role, env: { ...envFor(DEV), ...integration }, dotEnv: null, vercelEnv: "preview" })).toEqual([]);
        expect(checkDbTarget({ role, env: envFor(DEV), dotEnv: { ...devDotEnv, ...integration }, vercelEnv: "preview" })).toEqual([]);
      }
      expect(checkDbTarget({ role: "test", env: { ...envFor(TEST), ...integration }, dotEnv: devDotEnv })).toEqual([]);
    });

    it("warns instead: one notice with the count and a few names, never a value", () => {
      const w = dbTargetWarnings({ ...envFor(DEV), ...integration }, null);
      expect(w).toHaveLength(1);
      expect(w[0]).toMatch(/20 LEARNING_DB_\* variable\(s\)/);
      expect(w[0]).toMatch(/LEARNING_DB_DATABASE_URL/);
      expect(w[0]).toMatch(/\.\.\./);
      expect(w[0]).toMatch(/ignored/);
      expect(w[0]).not.toContain("integration-value-do-not-print");
    });

    it("counts a name once when it is in both the process env and .env", () => {
      const w = dbTargetWarnings({ ...envFor(DEV), LEARNING_DB_PGHOST: "a" }, { LEARNING_DB_PGHOST: "b", LEARNING_DB_PGUSER: "c" });
      expect(w[0]).toMatch(/^2 LEARNING_DB_\*/);
    });

    it("gives no warning when none are set", () => {
      expect(dbTargetWarnings(envFor(DEV), devDotEnv)).toEqual([]);
      expect(integrationVarNames(envFor(DEV), null)).toEqual([]);
    });

    it("still fails when DATABASE_URL is missing, even though LEARNING_DB_DATABASE_URL is present (nothing falls back to it)", () => {
      const env = { DIRECT_URL: url(DEV), ...integration, LEARNING_DB_DATABASE_URL: url(withPooler(DEV)) };
      expect(checkDbTarget({ role: "not-production", env, dotEnv: null }).join()).toMatch(/DATABASE_URL is missing/);
    });

    it("still fails when DIRECT_URL is missing", () => {
      const env = { DATABASE_URL: url(withPooler(DEV)), ...integration };
      expect(checkDbTarget({ role: "not-production", env, dotEnv: null }).join()).toMatch(/DIRECT_URL is missing/);
    });

    it("a Preview build that targets production still fails", () => {
      const env = { ...envFor(PRODUCTION_DB_HOST), ...integration };
      expect(checkDbTarget({ role: "build", env, dotEnv: null, vercelEnv: "preview" }).join()).toMatch(/preview build points at PRODUCTION|preview.*PRODUCTION/i);
    });

    it("a LEARNING_DB_* value that is the production URL neither fails a dev target nor changes the target", () => {
      const env = { ...envFor(DEV), LEARNING_DB_DATABASE_URL: url(withPooler(PRODUCTION_DB_HOST)) };
      expect(checkDbTarget({ role: "build", env, dotEnv: null, vercelEnv: "preview" })).toEqual([]);
      expect(parseDbTarget(env.DATABASE_URL)?.host).toBe(DEV);
    });
  });
  it("not-production role: dev passes, prod fails, override does not help", () => {
    expect(checkDbTarget({ role: "not-production", env: envFor(DEV), dotEnv: devDotEnv })).toEqual([]);
    const env = { ...envFor(PRODUCTION_DB_HOST), [PRODUCTION_OVERRIDE_ENV]: PRODUCTION_DB_HOST };
    expect(checkDbTarget({ role: "not-production", env, dotEnv: devDotEnv }).join()).toMatch(/PRODUCTION/);
  });
  it("import role: prod only with the exact override value", () => {
    const base = envFor(PRODUCTION_DB_HOST);
    expect(checkDbTarget({ role: "import", env: base, dotEnv: devDotEnv }).join()).toMatch(/Refusing/);
    expect(checkDbTarget({ role: "import", env: { ...base, [PRODUCTION_OVERRIDE_ENV]: "yes" }, dotEnv: devDotEnv }).length).toBeGreaterThan(0);
    expect(checkDbTarget({ role: "import", env: { ...base, [PRODUCTION_OVERRIDE_ENV]: PRODUCTION_DB_HOST }, dotEnv: devDotEnv })).toEqual([]);
  });
  it("build role: Vercel preview/local may not use prod; Vercel production may", () => {
    const env = envFor(PRODUCTION_DB_HOST);
    expect(checkDbTarget({ role: "build", env, dotEnv: null, vercelEnv: "preview" }).join()).toMatch(/preview/);
    expect(checkDbTarget({ role: "build", env, dotEnv: null }).join()).toMatch(/local/);
    expect(checkDbTarget({ role: "build", env, dotEnv: null, vercelEnv: "production" })).toEqual([]);
    expect(checkDbTarget({ role: "build", env: envFor(DEV), dotEnv: null, vercelEnv: "preview" })).toEqual([]);
  });
});

describe("checkRuntimeTarget", () => {
  const prod = { DATABASE_URL: url(withPooler(PRODUCTION_DB_HOST)) };
  it("blocks prod from Preview and from local runs", () => {
    expect(checkRuntimeTarget(prod, "preview").length).toBe(1);
    expect(checkRuntimeTarget(prod, undefined).length).toBe(1);
  });
  it("allows prod on Vercel Production or with the explicit override", () => {
    expect(checkRuntimeTarget(prod, "production")).toEqual([]);
    expect(checkRuntimeTarget({ ...prod, [PRODUCTION_OVERRIDE_ENV]: PRODUCTION_DB_HOST }, undefined)).toEqual([]);
  });
  it("never blocks non-production hosts", () => {
    expect(checkRuntimeTarget({ DATABASE_URL: url(DEV) }, "preview")).toEqual([]);
    expect(checkRuntimeTarget({}, undefined)).toEqual([]);
  });
});
