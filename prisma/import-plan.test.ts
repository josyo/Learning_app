import { describe, expect, it } from "vitest";
import {
  ARCHIVE_ORDER_BASE,
  planIsEmpty,
  planLessons,
  simulateLearnerImpact,
  type DbLesson,
  type DesiredLesson,
  type LearnerModuleFacts,
} from "./import-plan";

const db = (slug: string, order: number, over: Partial<DbLesson> = {}): DbLesson => ({
  id: `id-${slug}`,
  slug,
  title: `Title ${slug}`,
  content: `Content ${slug}`,
  order,
  required: true,
  videoUrl: null,
  archivedAt: null,
  resources: [],
  ...over,
});
const want = (slug: string, order: number, over: Partial<DesiredLesson> = {}): DesiredLesson => ({
  slug,
  title: `Title ${slug}`,
  content: `Content ${slug}`,
  order,
  videoUrl: null,
  resources: null,
  ...over,
});

describe("planLessons", () => {
  it("leaves identical lessons completely untouched", () => {
    const plan = planLessons([want("a", 0), want("b", 1)], [db("a", 0), db("b", 1)]);
    expect(plan.unchanged).toEqual(["a", "b"]);
    expect(planIsEmpty(plan)).toBe(true);
  });

  it("creates lessons whose slug is new", () => {
    const plan = planLessons([want("a", 0), want("new", 1)], [db("a", 0)]);
    expect(plan.create.map((c) => c.slug)).toEqual(["new"]);
    expect(plan.unchanged).toEqual(["a"]);
  });

  it("matches on slug, never title: a retitled lesson is an update, not create + orphan", () => {
    const plan = planLessons([want("a", 0, { title: "Completely new title" })], [db("a", 0)]);
    expect(plan.create).toEqual([]);
    expect(plan.archive).toEqual([]);
    expect(plan.update).toHaveLength(1);
    expect(plan.update[0]?.id).toBe("id-a");
    expect(plan.update[0]?.changes).toEqual(["title"]);
  });

  it("reports exactly which fields changed", () => {
    const plan = planLessons(
      [want("a", 2, { content: "x", videoUrl: "https://v", resources: [{ label: "L", url: "https://u" }] })],
      [db("a", 0, { required: false })]
    );
    expect(plan.update[0]?.changes.sort()).toEqual(["content", "order", "required", "resources", "video"]);
  });

  it("resources: null leaves them alone; [] clears; same set in another order is unchanged", () => {
    const r = [
      { label: "B", url: "https://b" },
      { label: "A", url: "https://a" },
    ];
    const existing = [db("a", 0, { resources: r })];
    expect(planLessons([want("a", 0, { resources: null })], existing).unchanged).toEqual(["a"]);
    expect(planLessons([want("a", 0, { resources: [...r].reverse() })], existing).unchanged).toEqual(["a"]);
    expect(planLessons([want("a", 0, { resources: [] })], existing).update[0]?.changes).toEqual(["resources"]);
  });

  it("ARCHIVES a lesson missing from the markdown, never deletes it", () => {
    const plan = planLessons([want("a", 0)], [db("a", 0), db("stale-1", 10000), db("stale-2", 10001)]);
    expect(plan.archive.map((x) => x.slug)).toEqual(["stale-1", "stale-2"]);
    expect(plan.create).toEqual([]);
    expect(plan.update).toEqual([]);
    expect(plan.unchanged).toEqual(["a"]);
  });

  it("parks archived lessons at distinct orders >= the archive base", () => {
    const plan = planLessons([want("a", 0)], [db("a", 0), db("x", 1), db("y", 2)]);
    const orders = [...plan.archiveOrders.values()];
    expect(orders).toHaveLength(2);
    expect(new Set(orders).size).toBe(2);
    expect(Math.min(...orders)).toBeGreaterThanOrEqual(ARCHIVE_ORDER_BASE);
  });

  it("does not reuse an order already held by an archived row", () => {
    const existing = [db("a", 0), db("old", ARCHIVE_ORDER_BASE, { archivedAt: new Date() }), db("x", 1)];
    const plan = planLessons([want("a", 0)], existing);
    expect(plan.stillArchived).toEqual(["old"]);
    expect(plan.archiveOrders.get("id-x")).toBe(ARCHIVE_ORDER_BASE + 1);
    expect(plan.archiveOrders.has("id-old")).toBe(false); // already parked; untouched
  });

  it("is idempotent: an already-archived, still-absent lesson needs no action", () => {
    const existing = [db("a", 0), db("old", ARCHIVE_ORDER_BASE, { archivedAt: new Date() })];
    expect(planIsEmpty(planLessons([want("a", 0)], existing))).toBe(true);
  });

  it("moves an archived row that sits at a live-range order up to the archive range", () => {
    const existing = [db("a", 0), db("old", 3, { archivedAt: new Date() })];
    const plan = planLessons([want("a", 0), want("b", 3)], existing);
    expect(plan.archiveOrders.get("id-old")).toBeGreaterThanOrEqual(ARCHIVE_ORDER_BASE);
    expect(plan.create.map((c) => c.slug)).toEqual(["b"]);
  });

  it("un-archives a lesson that reappears in the markdown", () => {
    const plan = planLessons([want("a", 0)], [db("a", ARCHIVE_ORDER_BASE, { archivedAt: new Date() })]);
    expect(plan.update[0]?.changes).toEqual(expect.arrayContaining(["un-archived", "order"]));
    expect(plan.archive).toEqual([]);
  });

  it("handles a reorder (swap) as two updates", () => {
    const plan = planLessons([want("b", 0), want("a", 1)], [db("a", 0), db("b", 1)]);
    expect(plan.update.map((u) => [u.slug, u.changes])).toEqual([
      ["b", ["order"]],
      ["a", ["order"]],
    ]);
  });
});

describe("simulateLearnerImpact", () => {
  const live = ["l0", "l1", "l2", "l3", "l4", "l5", "l6"].map((s, i) => db(s, i));
  const stale = [db("toolchain-basics", 10000), db("project-loop", 10001)];
  const existing = [...live, ...stale];
  const plan = planLessons(live.map((l, i) => want(l.slug, i)), existing);

  const learner = (name: string, done: string[], over: Partial<LearnerModuleFacts> = {}): LearnerModuleFacts => ({
    userId: name,
    name,
    completedLessonIds: new Set(done.map((s) => `id-${s}`)),
    hasAssignment: true,
    latestSubmissionStatus: null,
    override: null,
    ...over,
  });

  it("changes nothing for a learner who is mid-module (the expected result for Praise)", () => {
    const praise = learner("Praise", ["l0", "l1", "l2", "l3", "l4", "l5"]); // 6 of 7 live done, stale not done
    const [impact] = simulateLearnerImpact(plan, existing, [praise]);
    expect(impact?.before).toEqual({ completed: false, started: true });
    expect(impact?.after).toEqual({ completed: false, started: true });
    expect(impact?.changes).toBe(false);
  });

  it("archiving stale lessons can complete a module the learner had effectively finished", () => {
    const done = learner("Done", live.map((l) => l.slug), { latestSubmissionStatus: "APPROVED" });
    const [impact] = simulateLearnerImpact(plan, existing, [done]);
    expect(impact?.before.completed).toBe(false); // stale lessons blocked it
    expect(impact?.after.completed).toBe(true);
    expect(impact?.changes).toBe(true);
  });

  it("a newly created lesson un-completes a finished module, and the report says so", () => {
    const withNew = planLessons([...live.map((l, i) => want(l.slug, i)), want("brand-new", 7)], live);
    const done = learner("Done", live.map((l) => l.slug), { latestSubmissionStatus: "APPROVED" });
    const [impact] = simulateLearnerImpact(withNew, live, [done]);
    expect(impact?.before.completed).toBe(true);
    expect(impact?.after.completed).toBe(false);
    expect(impact?.changes).toBe(true);
  });

  it("a MARK_COMPLETE override is unaffected by any of it", () => {
    const o = learner("Overridden", [], { override: "MARK_COMPLETE" });
    const [impact] = simulateLearnerImpact(plan, existing, [o]);
    expect(impact?.changes).toBe(false);
    expect(impact?.after.completed).toBe(true);
  });

  it("progress on an archived lesson is untouched by the simulation (completion sets are only read)", () => {
    const stalers = learner("Trainee", ["toolchain-basics", "project-loop"], { hasAssignment: false });
    const [impact] = simulateLearnerImpact(plan, existing, [stalers]);
    expect(impact?.before.started).toBe(true); // counted stale progress before
    expect(impact?.after.started).toBe(false); // ignored after archive
  });
});
