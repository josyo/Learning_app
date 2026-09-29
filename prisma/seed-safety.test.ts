import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const seed = fs.readFileSync(path.join(__dirname, "seed.ts"), "utf8");

describe("prisma/seed.ts cannot reintroduce old content or destroy learner data", () => {
  it("never deletes anything (lesson/assignment deletes cascade to progress and submissions)", () => {
    expect(seed).not.toMatch(/\.delete(Many)?\(/);
  });
  it("does not import the retired lesson/assignment content data", () => {
    expect(seed).not.toMatch(/lesson-content-data|assignment-content-data|LESSON_CONTENT|ASSIGNMENT_CONTENT/);
  });
  it("does not write lessons or assignments at all (content comes only from import:content)", () => {
    expect(seed).not.toMatch(/db\.(lesson|assignment|lessonResource|submission|lessonProgress)\./);
  });
  it("the retired data files and cleanup script are gone", () => {
    for (const f of ["lesson-content-data.ts", "assignment-content-data.ts", "cleanup-orientation-lessons.ts"]) {
      expect(fs.existsSync(path.join(__dirname, f))).toBe(false);
    }
  });
});
