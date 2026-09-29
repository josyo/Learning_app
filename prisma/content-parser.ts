/**
 * Parser for content-drafts/<module-slug>.md. Pure: no I/O, no database.
 *
 * File shape:
 *
 *   (optional preamble, ignored)
 *   ### Lesson 1 — Title
 *   <!-- slug: stable-lesson-slug -->
 *   ...lesson markdown...
 *   ---
 *   ### Lesson 2 — Title
 *   <!-- slug: another-slug -->
 *   ...
 *   ---
 *   ## Assignment: Title
 *   <!-- slug: optional-assignment-slug -->
 *   ...instructions...
 *
 * Rules that make it safe:
 * - Identity is the declared slug, never the title. Retitling a lesson
 *   changes nothing about which database row it is.
 * - A line that is exactly `---` separates blocks, but only OUTSIDE code
 *   fences (``` or ~~~, any length >= 3; a longer fence can contain a
 *   shorter one). A `---` inside a fence is ordinary content.
 * - CRLF / CR line endings and a BOM are normalised first.
 * - Everything suspicious is an error, reported together, never silently
 *   dropped: malformed headings, stray text, a missing or invalid slug,
 *   duplicate slugs, a second assignment block, an unclosed fence.
 */

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface ParsedLesson {
  /** The N in "### Lesson N": informational only; order is file position. */
  number: number;
  title: string;
  slug: string;
  content: string;
  line: number;
}

export interface ParsedAssignment {
  title: string;
  /** Declared slug, or null if the file doesn't declare one. */
  slug: string | null;
  instructions: string;
  line: number;
}

export interface ParsedModule {
  lessons: ParsedLesson[];
  assignment: ParsedAssignment | null;
  warnings: string[];
}

export class ContentParseError extends Error {
  constructor(
    public readonly label: string,
    public readonly errors: string[]
  ) {
    super(`${label}:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
    this.name = "ContentParseError";
  }
}

const LESSON_HEADING = /^### Lesson (\d+) — (.+?)\s*$/;
const ASSIGNMENT_HEADING = /^## Assignment: (.+?)\s*$/;
// Anything that looks like a lesson/assignment heading but isn't exactly right.
const LOOSE_LESSON_HEADING = /^#{1,6}\s*Lesson\s+\d+/i;
const LOOSE_ASSIGNMENT_HEADING = /^#{1,6}\s*Assignment\b/i;
const SLUG_DIRECTIVE = /^<!--\s*slug:\s*(.*?)\s*-->\s*$/;
const FENCE_OPEN = /^ {0,3}(`{3,}|~{3,})(.*)$/;

export function normalizeNewlines(raw: string): string {
  return raw.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
}

interface Line {
  text: string;
  /** 1-based line number in the file. */
  no: number;
  /** True for fence delimiters and for everything between them. */
  inFence: boolean;
}

interface Block {
  lines: Line[];
}

/** Splits into blocks on `---` lines outside code fences. */
function splitBlocks(text: string, errors: string[]): Block[] {
  const blocks: Block[] = [{ lines: [] }];
  let fence: { ch: string; len: number; no: number } | null = null;

  text.split("\n").forEach((lineText, i) => {
    const no = i + 1;
    const current = blocks[blocks.length - 1] as Block;

    if (fence) {
      const close = lineText.match(/^ {0,3}(`{3,}|~{3,})\s*$/);
      const closes = close && close[1] && close[1][0] === fence.ch && close[1].length >= fence.len;
      current.lines.push({ text: lineText, no, inFence: true });
      if (closes) fence = null;
      return;
    }

    const open = lineText.match(FENCE_OPEN);
    const marker = open?.[1];
    // A backtick fence's info string may not contain a backtick (that would be inline code).
    if (open && marker && !(marker[0] === "`" && (open[2] ?? "").includes("`"))) {
      fence = { ch: marker[0] as string, len: marker.length, no };
      current.lines.push({ text: lineText, no, inFence: true });
      return;
    }

    if (/^---\s*$/.test(lineText)) {
      blocks.push({ lines: [] });
      return;
    }
    current.lines.push({ text: lineText, no, inFence: false });
  });

  if (fence) {
    errors.push(`Unclosed code fence opened at line ${(fence as { no: number }).no}: everything after it would be swallowed.`);
  }
  return blocks;
}

const isBlank = (l: Line) => l.text.trim() === "";

/**
 * After a heading: the first non-blank line must be the slug directive.
 * Returns the slug (or null) and the remaining lines, or records errors.
 */
function takeSlugDirective(
  body: Line[],
  what: string,
  required: boolean,
  errors: string[]
): { slug: string | null; rest: Line[] } {
  const firstIdx = body.findIndex((l) => !isBlank(l));
  const first = firstIdx === -1 ? undefined : body[firstIdx];
  const m = first && !first.inFence ? first.text.match(SLUG_DIRECTIVE) : null;
  if (!first || !m) {
    if (required) {
      errors.push(
        `${what}: missing slug. The first line after the heading must be <!-- slug: your-stable-slug -->.`
      );
    }
    return { slug: null, rest: body };
  }
  const slug = (m[1] ?? "").trim();
  if (!SLUG_RE.test(slug)) {
    errors.push(
      `Line ${first.no}: ${what} has an invalid slug "${slug}". Use lowercase letters, digits and single hyphens (e.g. "my-lesson-2").`
    );
    return { slug: null, rest: body.slice(firstIdx + 1) };
  }
  return { slug, rest: body.slice(firstIdx + 1) };
}

const joinLines = (lines: Line[]) => lines.map((l) => l.text).join("\n").trim();

export function parseModuleFile(raw: string, label = "module file"): ParsedModule {
  const errors: string[] = [];
  const warnings: string[] = [];
  const blocks = splitBlocks(normalizeNewlines(raw), errors);

  const lessons: ParsedLesson[] = [];
  const assignments: ParsedAssignment[] = [];
  let sawContentBlock = false; // a lesson or assignment block has been seen

  for (const block of blocks) {
    const outside = block.lines.filter((l) => !l.inFence);

    const lessonHeads = outside.filter((l) => LESSON_HEADING.test(l.text));
    const assignHeads = outside.filter((l) => ASSIGNMENT_HEADING.test(l.text));

    // Loose look-alikes are errors, never silently treated as text.
    for (const l of outside) {
      if (LOOSE_LESSON_HEADING.test(l.text) && !LESSON_HEADING.test(l.text)) {
        errors.push(`Line ${l.no}: malformed lesson heading "${l.text.trim()}". Expected exactly "### Lesson N — Title" (with an em dash).`);
      }
      if (LOOSE_ASSIGNMENT_HEADING.test(l.text) && !ASSIGNMENT_HEADING.test(l.text)) {
        errors.push(`Line ${l.no}: malformed assignment heading "${l.text.trim()}". Expected exactly "## Assignment: Title".`);
      }
    }

    if (lessonHeads.length + assignHeads.length === 0) {
      const text = joinLines(block.lines);
      if (text && sawContentBlock) {
        const first = block.lines.find((l) => !isBlank(l)) as Line;
        errors.push(
          `Line ${first.no}: text after the first lesson that is not under a "### Lesson N — Title" or "## Assignment: Title" heading. It would be dropped. Add a heading or remove it.`
        );
      }
      continue; // preamble before the first lesson: ignored
    }

    if (lessonHeads.length + assignHeads.length > 1) {
      const at = [...lessonHeads, ...assignHeads].map((l) => l.no).sort((a, b) => a - b);
      errors.push(
        `Lines ${at.join(", ")}: one block contains ${at.length} lesson/assignment headings. Separate them with a line that is exactly "---".`
      );
      sawContentBlock = true;
      continue;
    }

    const head = (lessonHeads[0] ?? assignHeads[0]) as Line;
    const headIdx = block.lines.indexOf(head);
    const before = block.lines.slice(0, headIdx);
    if (before.some((l) => !isBlank(l)) && sawContentBlock) {
      const first = before.find((l) => !isBlank(l)) as Line;
      errors.push(`Line ${first.no}: text before the heading of the block that starts at line ${head.no}. It would be dropped.`);
    }
    const body = block.lines.slice(headIdx + 1);

    if (lessonHeads.length === 1) {
      const m = head.text.match(LESSON_HEADING) as RegExpMatchArray;
      const title = (m[2] ?? "").trim();
      const what = `Lesson "${title}" (line ${head.no})`;
      const { slug, rest } = takeSlugDirective(body, what, true, errors);
      const content = joinLines(rest);
      if (!content) errors.push(`${what}: the lesson has no content.`);
      if (slug) lessons.push({ number: Number(m[1]), title, slug, content, line: head.no });
    } else {
      const m = head.text.match(ASSIGNMENT_HEADING) as RegExpMatchArray;
      const title = (m[1] ?? "").trim();
      const what = `Assignment "${title}" (line ${head.no})`;
      const { slug, rest } = takeSlugDirective(body, what, false, errors);
      const instructions = joinLines(rest);
      if (!instructions) errors.push(`${what}: the assignment has no instructions.`);
      assignments.push({ title, slug, instructions, line: head.no });
    }
    sawContentBlock = true;
  }

  if (lessons.length === 0 && !errors.some((e) => /lesson/i.test(e))) {
    errors.push('No lessons found. Expected blocks starting "### Lesson N — Title".');
  }

  // Duplicate slugs.
  const bySlug = new Map<string, ParsedLesson[]>();
  for (const l of lessons) bySlug.set(l.slug, [...(bySlug.get(l.slug) ?? []), l]);
  for (const [slug, group] of bySlug) {
    if (group.length > 1) {
      errors.push(`Duplicate lesson slug "${slug}" at lines ${group.map((l) => l.line).join(", ")}. Each lesson needs its own slug.`);
    }
  }

  // Only one assignment per module.
  if (assignments.length > 1) {
    errors.push(
      `Duplicate assignment blocks at lines ${assignments.map((a) => a.line).join(", ")}. A module has exactly one assignment; the second would silently overwrite the first.`
    );
  }

  // Numbering drift is a warning: the number is informational.
  lessons.forEach((l, i) => {
    if (l.number !== i + 1) warnings.push(`Lesson "${l.title}" (line ${l.line}) is numbered ${l.number} but is lesson ${i + 1} in the file.`);
  });

  if (errors.length > 0) throw new ContentParseError(label, errors);
  return { lessons, assignment: assignments[0] ?? null, warnings };
}
