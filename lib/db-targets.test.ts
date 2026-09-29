import { describe, expect, it } from "vitest";
import {
  PRODUCTION_DB_HOST,
  PRODUCTION_OVERRIDE_ENV,
  checkDbTarget,
  checkRuntimeTarget,
  parseDbTarget,
} from "./db-targets";

const url = (host: string, db = "neondb") => `postgresql://u:secret@${host}/${db}?sslmode=require`;
const DEV = "ep-dev-000000.c-10.us-east-1.aws.neon.tech";
const TEST = "ep-test-111111.c-10.us-east-1.aws.neon.tech";
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
  it("refuses the retired LEARNING_DB_DATABASE_URL in process env or .env", () => {
    const a = checkDbTarget({ role: "not-production", env: { ...envFor(DEV), LEARNING_DB_DATABASE_URL: "x" }, dotEnv: null });
    const b = checkDbTarget({ role: "not-production", env: envFor(DEV), dotEnv: { ...devDotEnv, LEARNING_DB_DATABASE_URL: "x" } });
    expect(a.join()).toMatch(/retired/);
    expect(b.join()).toMatch(/retired/);
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
