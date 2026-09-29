/**
 * Counts rows per table from the SQL that `pg_restore --data-only --file=-`
 * prints for a pg_dump backup. Pure; no I/O.
 *
 * Each table's data is a COPY block:
 *
 *   COPY public.lesson (id, ...) FROM stdin;
 *   <one line per row>
 *   \.
 *
 * Names are printed as pg_dump quotes them: `public.lesson`, `public."user"`
 * (a reserved word), `neon_auth."user"`. The result uses the same naming as
 * scripts/row-counts.ts on the live side: "table" for public, "schema.table"
 * for anything else, with quotes removed.
 */

const IDENT = String.raw`(?:"(?:[^"]|"")+"|[^\s".(]+)`;
const COPY_LINE = new RegExp(String.raw`^COPY (${IDENT}(?:\.${IDENT})?)\s*\(.*\) FROM stdin;$`);

const unquote = (id: string) => (id.startsWith('"') ? id.slice(1, -1).replace(/""/g, '"') : id);

/** `public."user"` -> `user`, `neon_auth."user"` -> `neon_auth.user`, `lesson` -> `lesson`. */
export function normalizeCopyName(raw: string): string {
  const parts = raw.match(new RegExp(IDENT, "g")) ?? [raw];
  const names = parts.map(unquote);
  return names.length === 2 && names[0] === "public" ? (names[1] as string) : names.join(".");
}

export function countRowsInDumpSql(sql: string): Map<string, number> {
  const counts = new Map<string, number>();
  let current: string | null = null;
  for (const line of sql.split(/\r?\n/)) {
    if (current === null) {
      const m = line.match(COPY_LINE);
      if (m?.[1]) {
        current = normalizeCopyName(m[1]);
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
