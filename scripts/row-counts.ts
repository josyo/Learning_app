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
 *
 * Built for a slow link: all tables are counted in ONE statement, the
 * transaction has explicit timeout/maxWait (lib/slow-link.ts), and the
 * connection timeouts are raised.
 */
import { spawnSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import { describeTarget, parseDbTarget } from "../lib/db-targets";
import { countRowsInDumpSql } from "../lib/dump-counts";
import { SLOW_TX_OPTIONS, withSlowLinkParams } from "../lib/slow-link";

/**
 * ONE statement that counts every user table. `query_to_xml` runs a
 * `select count(*)` for each table name found in information_schema and hands
 * the result back as XML, so the whole comparison costs a single round trip
 * (the previous version made one query per table, ~30 round trips, and blew
 * Prisma's 5 s transaction default over a Lagos to us-east-1 link). Names come
 * from the catalog and are quoted by format('%I'); nothing here can write.
 */
export const LIVE_COUNTS_SQL = `
  select table_schema, table_name,
         (xpath('/row/c/text()',
                query_to_xml(format('select count(*) as c from %I.%I', table_schema, table_name), false, true, '')
         ))[1]::text::int as n
  from information_schema.tables
  where table_type = 'BASE TABLE' and table_schema not in ('pg_catalog', 'information_schema')
  order by table_schema, table_name`;

const PG_RESTORE = process.env.PG_RESTORE ?? "C:/Program Files/PostgreSQL/18/bin/pg_restore.exe";

function countsFromDump(file: string): Map<string, number> {
  const r = spawnSync(PG_RESTORE, ["--data-only", "--file=-", file], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`pg_restore failed: ${r.stderr}`);
  return countRowsInDumpSql(r.stdout); // parsing lives in lib/dump-counts.ts (unit-tested)
}

async function countsFromLive(url: string): Promise<{ counts: Map<string, number>; statements: number }> {
  const db = new PrismaClient({
    datasourceUrl: withSlowLinkParams(url), // connect/pool timeouts raised for a slow link
    log: [{ emit: "event", level: "query" }],
  });
  let statements = 0;
  db.$on("query", () => {
    statements++;
  });
  try {
    // Still one READ ONLY transaction, enforced by Postgres, and now with
    // explicit limits instead of Prisma's 5 s default.
    const counts = await db.$transaction(async (tx) => {
      await tx.$executeRawUnsafe("SET TRANSACTION READ ONLY");
      const rows = await tx.$queryRawUnsafe<{ table_schema: string; table_name: string; n: number }[]>(LIVE_COUNTS_SQL);
      // Named the way the dump names them: "table" for public, "schema.table" otherwise.
      return new Map(rows.map((r) => [r.table_schema === "public" ? r.table_name : `${r.table_schema}.${r.table_name}`, r.n]));
    }, SLOW_TX_OPTIONS);
    return { counts, statements };
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
  const { counts: live, statements } = await countsFromLive(url);
  console.log(`(${statements} statements sent to the database, including transaction begin/commit)`);

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
