import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FRONTEND_NEXTJS_MODULES } from "./curriculum-data";
import { CONTENT_DIR, MODULE_SLUGS, loadAllModules, validateMediaMap } from "./content-source";
import { MEDIA_MAP } from "./media-map";

describe("the real content-drafts/ directory", () => {
  const loaded = loadAllModules();

  it("parses every module with no errors", () => {
    expect(loaded.errors).toEqual([]);
  });

  it("covers exactly the 12 curriculum modules, including html-foundations", () => {
    expect([...MODULE_SLUGS].sort()).toEqual(FRONTEND_NEXTJS_MODULES.map((m) => m.slug).sort());
    expect(MODULE_SLUGS).toContain("html-foundations");
    expect([...loaded.modules.keys()].sort()).toEqual([...MODULE_SLUGS].sort());
  });

  it("every lesson declares a unique slug across the whole path", () => {
    const all = [...loaded.modules.values()].flatMap((m) => m.lessons.map((l) => l.slug));
    expect(new Set(all).size).toBe(all.length);
    expect(all.length).toBeGreaterThan(50);
  });

  it("keeps the slugs the database already uses (the Orientation rewrite)", () => {
    const slugs = loaded.modules.get("developer-orientation")?.lessons.map((l) => l.slug);
    expect(slugs).toEqual([
      "welcome-what-you-re-actually-going-to-be-doing",
      "what-is-a-code-editor-and-installing-vs-code",
      "finding-your-way-around-vs-code",
      "what-is-a-terminal-and-how-do-you-use-one",
      "installing-node-js-and-running-your-first-command",
      "how-assignments-and-reviews-work",
      "a-tour-of-a-real-project-s-folders",
    ]);
  });

  it("every media-map entry belongs to a declared lesson slug", () => {
    expect(validateMediaMap(MEDIA_MAP, loaded.modules)).toEqual([]);
  });

  it("no lesson content contains a leftover slug directive", () => {
    for (const m of loaded.modules.values()) for (const l of m.lessons) expect(l.content).not.toMatch(/<!--\s*slug:/);
  });

  it("content files are LF on disk (importer normalises anyway; .gitattributes enforces it)", () => {
    for (const slug of MODULE_SLUGS) expect(fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8")).not.toContain("\r");
  });
});

describe("loadAllModules fails loudly", () => {
  const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "content-"));
  const ok = "### Lesson 1 — A\n<!-- slug: a -->\n\nBody.";

  it("aborts on an unknown module file (misspelt filename)", () => {
    const dir = tmp();
    fs.writeFileSync(path.join(dir, "html-foundation.md"), ok);
    const r = loadAllModules(dir, {}, ["html-foundations"]);
    expect(r.errors.join("\n")).toMatch(/html-foundation\.md is not a known module slug/);
    expect(r.errors.join("\n")).toMatch(/Missing content-drafts\/html-foundations\.md/);
  });

  it("collects errors from every file, not just the first", () => {
    const dir = tmp();
    fs.writeFileSync(path.join(dir, "one.md"), "### Lesson 1 — X\nno slug");
    fs.writeFileSync(path.join(dir, "two.md"), "### Lesson 1 — Y\nno slug either");
    const r = loadAllModules(dir, {}, ["one", "two"]);
    expect(r.errors).toHaveLength(2);
  });

  it("rejects the same lesson slug in two modules (media-map is keyed by slug alone)", () => {
    const dir = tmp();
    fs.writeFileSync(path.join(dir, "one.md"), ok);
    fs.writeFileSync(path.join(dir, "two.md"), ok);
    expect(loadAllModules(dir, {}, ["one", "two"]).errors.join()).toMatch(/used in both one and two/);
  });

  it("rejects a media-map entry that matches no lesson", () => {
    const dir = tmp();
    fs.writeFileSync(path.join(dir, "one.md"), ok);
    const r = loadAllModules(dir, { "renamed-slug": { videoUrl: "https://v" } }, ["one"]);
    expect(r.errors.join()).toMatch(/entry for "renamed-slug"/);
  });
});
