/**
 * Pure planning for the content importer: given what the markdown says and
 * what the database holds, decide what would change. No I/O. Both --dry-run
 * and the real import use this, so the dry run cannot disagree with the
 * import.
 *
 * Rules:
 * - Match on slug only, never on title.
 * - A lesson in the database but absent from the markdown is ARCHIVED
 *   (archivedAt set), never deleted, so LessonProgress is preserved.
 * - A lesson that reappears in the markdown is un-archived.
 * - Anything already identical is left untouched (no write, no updatedAt bump).
 */
import { deriveLearnerModuleState, type RawLesson, type SubmissionStatus, type OverrideAction } from "../modules/learning/derive-module-state";

/** Archived lessons are parked here, above any real order, keeping (moduleId, order) unique. */
export const ARCHIVE_ORDER_BASE = 10_000;

export interface Resource {
  label: string;
  url: string;
}

export interface DesiredLesson {
  slug: string;
  title: string;
  content: string;
  order: number;
  videoUrl: string | null;
  /** null = leave the lesson's existing resources alone. */
  resources: Resource[] | null;
}

export interface DbLesson {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
  required: boolean;
  videoUrl: string | null;
  archivedAt: Date | null;
  resources: Resource[];
}

export interface LessonUpdate {
  id: string;
  slug: string;
  desired: DesiredLesson;
  /** Which fields differ, for reporting. */
  changes: string[];
}

export interface LessonPlan {
  create: DesiredLesson[];
  update: LessonUpdate[];
  unchanged: string[];
  /** Live lessons that are not in the markdown any more. */
  archive: { id: string; slug: string; title: string; order: number }[];
  /** Already archived and still absent: nothing to do. */
  stillArchived: string[];
  /** Final order for every archived row (new and old) that needs one. */
  archiveOrders: Map<string, number>;
}

const sortedResources = (r: Resource[]) =>
  JSON.stringify([...r].sort((a, b) => a.label.localeCompare(b.label) || a.url.localeCompare(b.url)));

export function planLessons(desired: DesiredLesson[], existing: DbLesson[]): LessonPlan {
  const bySlug = new Map(existing.map((l) => [l.slug, l]));
  const desiredSlugs = new Set(desired.map((d) => d.slug));

  const plan: LessonPlan = {
    create: [],
    update: [],
    unchanged: [],
    archive: [],
    stillArchived: [],
    archiveOrders: new Map(),
  };

  for (const d of desired) {
    const row = bySlug.get(d.slug);
    if (!row) {
      plan.create.push(d);
      continue;
    }
    const changes: string[] = [];
    if (row.archivedAt !== null) changes.push("un-archived");
    if (row.title !== d.title) changes.push("title");
    if (row.content !== d.content) changes.push("content");
    if (row.order !== d.order) changes.push("order");
    if (row.videoUrl !== d.videoUrl) changes.push("video");
    if (!row.required) changes.push("required");
    if (d.resources !== null && sortedResources(row.resources) !== sortedResources(d.resources)) changes.push("resources");

    if (changes.length === 0) plan.unchanged.push(d.slug);
    else plan.update.push({ id: row.id, slug: d.slug, desired: d, changes });
  }

  const absent = existing.filter((l) => !desiredSlugs.has(l.slug)).sort((a, b) => a.order - b.order);
  const usedArchiveOrders = new Set(
    absent.filter((l) => l.archivedAt !== null && l.order >= ARCHIVE_ORDER_BASE).map((l) => l.order)
  );
  let next = ARCHIVE_ORDER_BASE;
  const nextFree = () => {
    while (usedArchiveOrders.has(next)) next++;
    usedArchiveOrders.add(next);
    return next++;
  };
  for (const l of absent) {
    if (l.archivedAt === null) plan.archive.push({ id: l.id, slug: l.slug, title: l.title, order: l.order });
    else plan.stillArchived.push(l.slug);
    // Any archived row must sit at >= BASE so its order can never collide with a live one.
    if (l.archivedAt === null || l.order < ARCHIVE_ORDER_BASE) plan.archiveOrders.set(l.id, nextFree());
  }
  return plan;
}

export const planIsEmpty = (p: LessonPlan) => p.create.length === 0 && p.update.length === 0 && p.archive.length === 0 && p.archiveOrders.size === 0;

// --- learner impact ---------------------------------------------------------

export interface LearnerModuleFacts {
  userId: string;
  name: string;
  /** Completed lesson ids for this learner in this module. */
  completedLessonIds: Set<string>;
  hasAssignment: boolean;
  latestSubmissionStatus: SubmissionStatus | null;
  override: OverrideAction | null;
}

export interface LearnerImpact {
  userId: string;
  name: string;
  before: { completed: boolean; started: boolean };
  after: { completed: boolean; started: boolean };
  changes: boolean;
}

/**
 * What each learner's module state would be before and after applying the
 * plan, using the same pure function the app uses (deriveLearnerModuleState).
 * Created lessons start incomplete; archived lessons stop counting; updated
 * and unchanged lessons keep the learner's completion (slug identity).
 */
export function simulateLearnerImpact(plan: LessonPlan, existing: DbLesson[], learners: LearnerModuleFacts[]): LearnerImpact[] {
  const archiveIds = new Set(plan.archive.map((a) => a.id));
  const unarchiveIds = new Set(plan.update.filter((u) => u.changes.includes("un-archived")).map((u) => u.id));

  return learners.map((l) => {
    const before: RawLesson[] = existing.map((row) => ({
      required: row.required,
      archived: row.archivedAt !== null,
      completed: l.completedLessonIds.has(row.id),
    }));
    const after: RawLesson[] = [
      ...existing.map((row) => ({
        required: true, // the importer marks every markdown lesson required
        archived: archiveIds.has(row.id) || (row.archivedAt !== null && !unarchiveIds.has(row.id)),
        completed: l.completedLessonIds.has(row.id),
      })),
      ...plan.create.map(() => ({ required: true, archived: false, completed: false })),
    ];
    const base = {
      moduleId: "m",
      requiredModuleIds: [],
      hasAssignment: l.hasAssignment,
      latestSubmissionStatus: l.latestSubmissionStatus,
      override: l.override,
    };
    const b = deriveLearnerModuleState({ ...base, lessons: before });
    const a = deriveLearnerModuleState({ ...base, lessons: after });
    return {
      userId: l.userId,
      name: l.name,
      before: { completed: b.completed, started: b.started },
      after: { completed: a.completed, started: a.started },
      changes: b.completed !== a.completed || b.started !== a.started,
    };
  });
}
