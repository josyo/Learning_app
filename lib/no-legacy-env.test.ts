/**
 * Guard against depending on the Vercel Neon integration's LEARNING_DB_*
 * variables. Vercel injects about 20 of them into Production and Preview and
 * they cannot be removed, so the build guard only WARNS about them. The
 * protection is this test: no source file may read one, so the app and the
 * scripts can only ever connect through DATABASE_URL and DIRECT_URL.
 *
 * Background: a generated Prisma client that read LEARNING_DB_DATABASE_URL
 * (instead of DATABASE_URL) silently pointed "dev" at production once.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "..");
const PREFIX = "LEARNING_DB_";

const SCAN_DIRS = ["app", "lib", "modules", "prisma", "scripts", "components", "e2e"];
const SCAN_FILES = [
  "middleware.ts", "next.config.ts", "playwright.config.ts", "vitest.config.ts", "tailwind.config.ts",
  "postcss.config.js", "package.json", ".env.example", "env.test.example",
];
const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|prisma|json)$/;
const SKIP_DIRS = new Set(["node_modules", ".next", "migrations"]);
const isTest = (file: string) => /\.test\.(ts|tsx)$/.test(file);

/** The only source file allowed to contain the prefix (it takes env as an argument). */
const ALLOWED = ["lib/db-targets.ts"];

export interface Finding {
  file: string;
  line: number;
  text: string;
}

function walk(dir: string, out: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, out);
    } else if (SOURCE_EXT.test(entry.name) && !isTest(entry.name)) {
      out.push(full);
    }
  }
}

/** Every line, in the scanned files, that mentions the prefix. */
export function findLegacyEnvReads(root: string, allowed: string[] = ALLOWED): Finding[] {
  const files: string[] = [];
  for (const d of SCAN_DIRS) walk(path.join(root, d), files);
  for (const f of SCAN_FILES) if (fs.existsSync(path.join(root, f))) files.push(path.join(root, f));

  const findings: Finding[] = [];
  for (const file of files) {
    const rel = path.relative(root, file).split(path.sep).join("/");
    if (allowed.includes(rel)) continue;
    fs.readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((text, i) => {
        if (text.includes(PREFIX)) findings.push({ file: rel, line: i + 1, text: text.trim().slice(0, 120) });
      });
  }
  return findings;
}

describe("nothing reads the integration's LEARNING_DB_* variables", () => {
  it("no source file (app, lib, modules, prisma, scripts, components, e2e, root config) mentions one", () => {
    const found = findLegacyEnvReads(ROOT);
    expect(found, found.map((f) => `${f.file}:${f.line}: ${f.text}`).join("\n")).toEqual([]);
  });

  it("the one allowed file never reads the process environment itself", () => {
    for (const rel of ALLOWED) {
      const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
      expect(src, `${rel} must take env as an argument`).not.toMatch(/process\.env/);
    }
  });

  it("the Prisma schema reads exactly DATABASE_URL and DIRECT_URL", () => {
    const schema = fs.readFileSync(path.join(ROOT, "prisma", "schema.prisma"), "utf8");
    const used = [...schema.matchAll(/env\("([A-Za-z0-9_]+)"\)/g)].map((m) => m[1]).sort();
    expect(used).toEqual(["DATABASE_URL", "DIRECT_URL"]);
  });

  it("the generated Prisma client reads DATABASE_URL (a stale client is how 'dev' once hit production)", () => {
    const generated = path.join(ROOT, "node_modules", ".prisma", "client", "index.js");
    if (!fs.existsSync(generated)) return; // not generated in this checkout: nothing to check
    const src = fs.readFileSync(generated, "utf8");
    expect(src, "run `npm run db:generate`").toContain('"fromEnvVar": "DATABASE_URL"');
    expect(src).not.toContain(PREFIX);
  });
});

describe("findLegacyEnvReads (self-test: the scanner really catches reads)", () => {
  function fixture(files: Record<string, string>): string {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "legacy-env-"));
    for (const [rel, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
      fs.writeFileSync(path.join(dir, rel), content);
    }
    return dir;
  }

  it("flags dot, bracket, destructuring, Prisma env(), package.json and template reads", () => {
    const root = fixture({
      "app/a.ts": "const u = process.env.LEARNING_DB_DATABASE_URL;",
      "lib/b.ts": 'const u = process.env["LEARNING_DB_PGHOST"];',
      "modules/c.ts": "const { LEARNING_DB_POSTGRES_URL } = process.env;",
      "prisma/schema.prisma": 'datasource db { url = env("LEARNING_DB_DATABASE_URL") }',
      "scripts/d.ts": "if (process.env.LEARNING_DB_NEON_API_KEY) {}",
      "package.json": '{"scripts":{"x":"echo $LEARNING_DB_DATABASE_URL"}}',
      ".env.example": 'LEARNING_DB_DATABASE_URL="postgresql://x"',
    });
    const files = findLegacyEnvReads(root).map((f) => f.file).sort();
    expect(files).toEqual([".env.example", "app/a.ts", "lib/b.ts", "modules/c.ts", "package.json", "prisma/schema.prisma", "scripts/d.ts"]);
  });

  it("reports file and line number", () => {
    const root = fixture({ "lib/x.ts": "line one\nconst a = process.env.LEARNING_DB_X;\n" });
    expect(findLegacyEnvReads(root)).toEqual([{ file: "lib/x.ts", line: 2, text: "const a = process.env.LEARNING_DB_X;" }]);
  });

  it("ignores test files, node_modules, .next and migrations", () => {
    const root = fixture({
      "lib/x.test.ts": "LEARNING_DB_X",
      "node_modules/pkg/index.js": "LEARNING_DB_X",
      "app/.next/a.js": "LEARNING_DB_X",
      "prisma/migrations/1/migration.sql": "LEARNING_DB_X",
      "lib/clean.ts": "const ok = process.env.DATABASE_URL;",
    });
    expect(findLegacyEnvReads(root)).toEqual([]);
  });

  it("respects the allowlist, but only for the exact file", () => {
    const root = fixture({ "lib/db-targets.ts": "const P = 'LEARNING_DB_';", "lib/other.ts": "const P = 'LEARNING_DB_';" });
    expect(findLegacyEnvReads(root).map((f) => f.file)).toEqual(["lib/other.ts"]);
  });
});
