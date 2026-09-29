import { describe, expect, it } from "vitest";
import { ContentParseError, normalizeNewlines, parseModuleFile } from "./content-parser";

const lesson = (n: number, title: string, slug: string, body = "Some content.") =>
  `### Lesson ${n} — ${title}\n<!-- slug: ${slug} -->\n\n${body}`;
const join = (...blocks: string[]) => blocks.join("\n---\n");

function errorsOf(raw: string): string[] {
  try {
    parseModuleFile(raw, "test.md");
  } catch (e) {
    if (e instanceof ContentParseError) return e.errors;
    throw e;
  }
  throw new Error("expected a ContentParseError");
}

describe("basic parsing", () => {
  it("parses lessons and an assignment, strips the slug directive from content", () => {
    const raw = join(
      "# Module: X\n\nPreamble text.\n\n" + lesson(1, "First", "first", "Body one."),
      lesson(2, "Second", "second", "Body two."),
      "## Assignment: Do it\n<!-- slug: do-it -->\n\nInstructions here."
    );
    const r = parseModuleFile(raw);
    expect(r.lessons.map((l) => [l.slug, l.title, l.content])).toEqual([
      ["first", "First", "Body one."],
      ["second", "Second", "Body two."],
    ]);
    expect(r.lessons[0]?.content).not.toContain("slug:");
    expect(r.assignment).toMatchObject({ title: "Do it", slug: "do-it", instructions: "Instructions here." });
  });

  it("identity is the slug: retitling changes the title but not the slug", () => {
    const a = parseModuleFile(lesson(1, "Old title", "same-slug"));
    const b = parseModuleFile(lesson(1, "Brand new title", "same-slug"));
    expect(a.lessons[0]?.slug).toBe(b.lessons[0]?.slug);
    expect(b.lessons[0]?.title).toBe("Brand new title");
  });

  it("an assignment slug is optional", () => {
    const r = parseModuleFile(join(lesson(1, "A", "a"), "## Assignment: T\n\nDo things."));
    expect(r.assignment).toMatchObject({ slug: null, instructions: "Do things." });
  });

  it("a module with no assignment is allowed", () => {
    expect(parseModuleFile(lesson(1, "A", "a")).assignment).toBeNull();
  });

  it("ignores preamble blocks before the first lesson", () => {
    const raw = join("# Approach\n\nNotes for authors.", "## Module: X\n\n" + lesson(1, "A", "a"));
    expect(parseModuleFile(raw).lessons).toHaveLength(1);
  });
});

describe("line endings", () => {
  it("parses CRLF files identically to LF (autocrlf checkouts)", () => {
    const lf = join(lesson(1, "A", "a", "x\n\n```\n---\n```"), lesson(2, "B", "b"));
    const crlf = lf.replace(/\n/g, "\r\n");
    expect(parseModuleFile(crlf)).toEqual(parseModuleFile(lf));
    expect(parseModuleFile(crlf).lessons).toHaveLength(2);
  });
  it("strips a BOM and handles lone CR", () => {
    expect(normalizeNewlines("﻿a\rb\r\nc")).toBe("a\nb\nc");
    expect(parseModuleFile("﻿" + lesson(1, "A", "a")).lessons).toHaveLength(1);
  });
});

describe("code fences", () => {
  it("does not split a lesson on --- inside a fenced code block", () => {
    const body = "Before.\n\n```yaml\n---\ntitle: x\n---\n```\n\nAfter.";
    const r = parseModuleFile(join(lesson(1, "A", "a", body), lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
    expect(r.lessons[0]?.content).toContain("title: x");
    expect(r.lessons[0]?.content).toContain("After.");
  });

  it("supports tilde fences", () => {
    const r = parseModuleFile(join(lesson(1, "A", "a", "~~~\n---\n~~~\nend"), lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
    expect(r.lessons[0]?.content).toContain("end");
  });

  it("handles nested fences: a longer outer fence can contain a shorter one", () => {
    const body = "````markdown\n```js\nconst x = 1;\n```\n---\n### Lesson 9 — fake\n````\nreal end";
    const r = parseModuleFile(join(lesson(1, "A", "a", body), lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
    expect(r.lessons[0]?.content).toContain("real end");
    expect(r.lessons[0]?.content).toContain("### Lesson 9 — fake"); // kept as content, not a lesson
  });

  it("a shorter fence does not close a longer one", () => {
    const body = "````\n```\n---\n```\nstill inside\n````\nout";
    const r = parseModuleFile(join(lesson(1, "A", "a", body), lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
    expect(r.lessons[0]?.content).toContain("still inside");
  });

  it("a tilde fence is not closed by backticks", () => {
    const body = "~~~\n```\n---\n~~~\nout";
    expect(parseModuleFile(join(lesson(1, "A", "a", body), lesson(2, "B", "b"))).lessons).toHaveLength(2);
  });

  it("does not treat a heading inside a fence as a lesson or assignment", () => {
    const body = "```\n### Lesson 5 — not real\n## Assignment: not real\n```";
    const r = parseModuleFile(lesson(1, "A", "a", body));
    expect(r.lessons).toHaveLength(1);
    expect(r.assignment).toBeNull();
  });

  it("does not split an assignment on --- inside a fence", () => {
    const r = parseModuleFile(join(lesson(1, "A", "a"), "## Assignment: T\n\nDo:\n\n```\n---\n```\nDone."));
    expect(r.assignment?.instructions).toContain("Done.");
  });

  it("fails loudly on an unclosed fence", () => {
    expect(errorsOf(lesson(1, "A", "a", "```js\nnever closed")).join()).toMatch(/Unclosed code fence opened at line 4/);
  });

  it("inline triple backticks on one line are not a fence", () => {
    const r = parseModuleFile(join(lesson(1, "A", "a", "Use ```code``` inline."), lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
  });
});

describe("separators", () => {
  it("tolerates a trailing separator and trailing blank lines", () => {
    const r = parseModuleFile(lesson(1, "A", "a") + "\n---\n\n\n");
    expect(r.lessons).toHaveLength(1);
  });
  it("tolerates a leading separator and doubled separators", () => {
    const r = parseModuleFile("---\n" + join(lesson(1, "A", "a"), "", lesson(2, "B", "b")));
    expect(r.lessons).toHaveLength(2);
  });
  it("---  with trailing spaces still separates; ----- and --- text do not", () => {
    const a = parseModuleFile(lesson(1, "A", "a") + "\n---   \n" + lesson(2, "B", "b"));
    expect(a.lessons).toHaveLength(2);
    const b = parseModuleFile(lesson(1, "A", "a", "x\n-----\n--- y\nz"));
    expect(b.lessons[0]?.content).toContain("-----");
  });
});

describe("fails loudly", () => {
  it("missing slug", () => {
    expect(errorsOf("### Lesson 1 — No slug\n\nBody.").join()).toMatch(/missing slug/);
  });
  it("invalid slug", () => {
    expect(errorsOf(lesson(1, "A", "Bad Slug")).join()).toMatch(/invalid slug "Bad Slug"/);
    expect(errorsOf(lesson(1, "A", "trailing-")).join()).toMatch(/invalid slug/);
  });
  it("the slug directive must come first, right after the heading", () => {
    expect(errorsOf("### Lesson 1 — A\n\nIntro first.\n<!-- slug: a -->").join()).toMatch(/missing slug/);
  });
  it("duplicate slugs, reporting both lines", () => {
    const e = errorsOf(join(lesson(1, "A", "dup"), lesson(2, "B", "dup"))).join();
    expect(e).toMatch(/Duplicate lesson slug "dup" at lines 1, 6/);
  });
  it("duplicate assignment blocks", () => {
    const raw = join(lesson(1, "A", "a"), "## Assignment: One\n\nx", "## Assignment: Two\n\ny");
    expect(errorsOf(raw).join()).toMatch(/Duplicate assignment blocks/);
  });
  it("empty lesson and empty assignment", () => {
    expect(errorsOf("### Lesson 1 — A\n<!-- slug: a -->\n").join()).toMatch(/no content/);
    expect(errorsOf(join(lesson(1, "A", "a"), "## Assignment: T\n")).join()).toMatch(/no instructions/);
  });
  it("no lessons at all", () => {
    expect(errorsOf("# Just a title\n\nNothing else.").join()).toMatch(/No lessons found/);
  });
  it("malformed headings are errors, not silently ignored text", () => {
    expect(errorsOf(join(lesson(1, "A", "a"), "### Lesson 2 - hyphen not em dash\n<!-- slug: b -->\nx")).join()).toMatch(/malformed lesson heading/);
    expect(errorsOf(join(lesson(1, "A", "a"), "### Assignment: wrong level\n\nx")).join()).toMatch(/malformed assignment heading/);
  });
  it("two lessons in one block (missing separator)", () => {
    expect(errorsOf(lesson(1, "A", "a") + "\n\n" + lesson(2, "B", "b")).join()).toMatch(/one block contains 2/);
  });
  it("stray text block after the first lesson", () => {
    expect(errorsOf(join(lesson(1, "A", "a"), "Orphaned notes with no heading.")).join()).toMatch(/would be dropped/);
  });
  it("reports every problem at once", () => {
    const e = errorsOf(join("### Lesson 1 — A\nbody", "### Lesson 2 — B\n<!-- slug: BAD -->\nbody"));
    expect(e.length).toBeGreaterThanOrEqual(2);
  });
  it("exposes the file label in the message", () => {
    expect(() => parseModuleFile("nope", "content-drafts/x.md")).toThrow(/content-drafts\/x\.md/);
  });
});

describe("warnings", () => {
  it("numbering drift is a warning, not an error", () => {
    const r = parseModuleFile(join(lesson(1, "A", "a"), lesson(3, "B", "b")));
    expect(r.lessons).toHaveLength(2);
    expect(r.warnings.join()).toMatch(/numbered 3 but is lesson 2/);
  });
});
