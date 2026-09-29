/**
 * Read-only row counts, and a comparison against a pg_dump backup.
 *
 *   tsx scripts/row-counts.ts --dump <file.dump>
 *       Counts rows per table inside the backup (no database contact).
 *
 *   COUNT_DB_URL='<connection string>' tsx scripts/row-counts.ts --compare <file.dump>
 *       Counts rows per table in the live database and diffs against the dump.
 *
 * COUNT_DB_URL is read from the environment of that one command only: never
 * from a file, never printed. Every live query runs inside
 * `SET TRANSACTION READ ONLY`, which Postgres enforces, so even a bug here
 * cannot write. Only the host and database name are printed.
 */
import { spawnSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import { describeTarget, parseDbTarget } from "../lib/db-targets";

const PG_RESTORE = process.env.PG_RESTORE ?? "C:/Program Files/PostgreSQL/18/bin/pg_restore.exe";

function countsFromDump(file: string): Map<string, number> {
  const r = spawnSync(PG_RESTORE, ["--data-only", "--file=-", file], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`pg_restore failed: ${r.stderr}`);
  const counts = new Map<string, number>();
  let current: string | null = null;
  for (const line of r.stdout.split(/\r?\n/)) {
    if (current === null) {
      const m = line.match(/^COPY (?:public\.)?"?([^"\s(]+)"?\s*\(.*\) FROM stdin;$/);
      if (m?.[1]) {
        current = m[1];
        counts.set(current, 0);
      }
    } else if (line === "\\.") {
      current = null;
    } else {
      counts.set(current, (counts.get(current) ?? 0) + 1);
    }
  }
  return counts;
}

async function countsFromLive(url: string): Promise<Map<string, number>> {
  const db = new PrismaClient({ datasourceUrl: url });
  try {
    return await db.$transaction(async (tx) => {
      await tx.$executeRawUnsafe("SET TRANSACTION READ ONLY");
      // Every user schema, named the way the dump names them: "table" for
      // public, "schema.table" otherwise (e.g. neon_auth.session).
      const tables = await tx.$queryRawUnsafe<{ table_schema: string; table_name: string }[]>(
        "select table_schema, table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema not in ('pg_catalog', 'information_schema') order by 1, 2"
      );
      const quote = (id: string) => `"${id.replace(/"/g, '""')}"`; // identifiers come from information_schema
      const out = new Map<string, number>();
      for (const { table_schema, table_name } of tables) {
        const rows = await tx.$queryRawUnsafe<{ n: number }[]>(
          `select count(*)::int as n from ${quote(table_schema)}.${quote(table_name)}`
        );
        out.set(table_schema === "public" ? table_name : `${table_schema}.${table_name}`, rows[0]?.n ?? 0);
      }
      return out;
    });
  } finally {
    await db.$disconnect();
  }
}

async function main() {
  const [flag, file] = process.argv.slice(2);
  if ((flag !== "--dump" && flag !== "--compare") || !file) {
    console.error("usage: row-counts.ts --dump <file> | COUNT_DB_URL=... row-counts.ts --compare <file>");
    process.exit(2);
  }
  const backup = countsFromDump(file);

  if (flag === "--dump") {
    for (const [t, n] of [...backup].sort()) console.log(t.padEnd(28), n);
    return;
  }

  const url = process.env.COUNT_DB_URL;
  if (!url) throw new Error("COUNT_DB_URL is not set.");
  console.log(`Live target: ${describeTarget(parseDbTarget(url))} (read-only transaction)`);
  const live = await countsFromLive(url);

  const names = [...new Set([...backup.keys(), ...live.keys()])].sort();
  let differing = 0;
  console.log(`\n${"table".padEnd(28)} ${"backup".padStart(7)} ${"live".padStart(7)}  diff`);
  for (const t of names) {
    const b = backup.get(t);
    const l = live.get(t);
    const d = b === undefined || l === undefined ? "MISSING" : l - b === 0 ? "" : String(l - b > 0 ? `+${l - b}` : l - b);
    if (d) differing++;
    console.log(`${t.padEnd(28)} ${String(b ?? "-").padStart(7)} ${String(l ?? "-").padStart(7)}  ${d}`);
  }
  console.log(differing === 0 ? "\nAll tables match the backup." : `\n${differing} table(s) differ from the backup.`);
  console.log('Note: "session", "verification" and lesson_progress can change legitimately with logins and learner activity since the backup.');
}

main().catch((e) => {
  console.error(String(e.message ?? e).replace(/postgres(ql)?:\/\/\S+/g, "<url-redacted>"));
  process.exit(1);
});
