import { describe, expect, it } from "vitest";
import { countRowsInDumpSql, normalizeCopyName } from "./dump-counts";

describe("normalizeCopyName", () => {
  it.each([
    ["lesson", "lesson"],
    ["public.lesson", "lesson"],
    ['public."user"', "user"],
    ['"user"', "user"],
    ["neon_auth.session", "neon_auth.session"],
    ['neon_auth."user"', "neon_auth.user"],
    ['"Weird Schema"."Odd Table"', "Weird Schema.Odd Table"],
    ['public."has ""quote"""', 'has "quote"'],
  ])("%s -> %s", (raw, expected) => {
    expect(normalizeCopyName(raw)).toBe(expected);
  });
});

describe("countRowsInDumpSql", () => {
  const sql = [
    "SET statement_timeout = 0;",
    "COPY public.lesson (id, slug) FROM stdin;",
    "a\tone",
    "b\ttwo",
    "c\tthree",
    "\\.",
    "",
    'COPY public."user" (id, name) FROM stdin;',
    "u1\tAda",
    "\\.",
    "",
    'COPY neon_auth."user" (id, name) FROM stdin;',
    "\\.",
    "",
    "COPY neon_auth.session (id) FROM stdin;",
    "s1",
    "s2",
    "\\.",
    "",
    "COPY public.mentor_assignment (id) FROM stdin;",
    "\\.",
  ].join("\n");

  const counts = countRowsInDumpSql(sql);

  it("counts rows per table", () => {
    expect(counts.get("lesson")).toBe(3);
    expect(counts.get("user")).toBe(1);
    expect(counts.get("neon_auth.session")).toBe(2);
  });

  it("includes empty tables with 0, including a schema-qualified quoted one (the bug that showed neon_auth.user as MISSING)", () => {
    expect(counts.get("mentor_assignment")).toBe(0);
    expect(counts.get("neon_auth.user")).toBe(0);
    expect(counts.has("neon_auth.user")).toBe(true);
  });

  it("does not leak or invent tables", () => {
    expect([...counts.keys()].sort()).toEqual(["lesson", "mentor_assignment", "neon_auth.session", "neon_auth.user", "user"]);
  });

  it("ignores everything outside COPY blocks and handles CRLF", () => {
    const crlf = sql.replace(/\n/g, "\r\n");
    expect(countRowsInDumpSql(crlf)).toEqual(counts);
  });

  it("a data row that merely starts with backslash-dot text does not end the block early", () => {
    const tricky = ["COPY public.x (a) FROM stdin;", "\\.not-the-end", "row", "\\."].join("\n");
    expect(countRowsInDumpSql(tricky).get("x")).toBe(2);
  });
});
