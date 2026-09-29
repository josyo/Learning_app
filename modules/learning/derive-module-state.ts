import type { LearnerModuleState, ModuleNode } from "@/modules/progress/compute-module-statuses";

export type SubmissionStatus = "SUBMITTED" | "APPROVED" | "CHANGES_REQUESTED";
export type OverrideAction = "MARK_COMPLETE" | "UNLOCK";

export interface RawLesson {
  required: boolean;
  /** True once the content importer archived it (absent from the module's markdown). */
  archived: boolean;
  /** This learner's completion. Progress rows on archived lessons are kept but ignored. */
  completed: boolean;
}

export interface RawModuleState {
  moduleId: string;
  requiredModuleIds: string[];
  /** Every lesson row in the module, archived ones included. */
  lessons: RawLesson[];
  hasAssignment: boolean;
  latestSubmissionStatus: SubmissionStatus | null;
  override: OverrideAction | null;
}

/**
 * A module is "complete" once every required, non-archived lesson is
 * done AND (if the module has an assignment) that assignment's latest
 * submission is APPROVED. A module with no lessons and no
 * assignment yet (unauthored) can never complete on its own — there
 * has to be something to actually finish.
 *
 * Archived lessons (see Lesson.archivedAt) never count: not toward
 * completion, not as "started". Their LessonProgress rows are untouched,
 * so un-archiving a lesson restores that learner's history.
 *
 * A mentor's MARK_COMPLETE override short-circuits all of that.
 * UNLOCK only bypasses the prerequisite lock — normal completion
 * rules still apply on top of it.
 */
export function deriveLearnerModuleState(raw: RawModuleState): LearnerModuleState {
  const counted = raw.lessons.filter((l) => l.required && !l.archived);
  const hasLessons = counted.length > 0;
  const lessonsOk = hasLessons ? counted.every((l) => l.completed) : true;
  const assignmentOk = raw.hasAssignment
    ? raw.latestSubmissionStatus === "APPROVED"
    : true;
  const hasContent = hasLessons || raw.hasAssignment;

  const naturallyCompleted = hasContent && lessonsOk && assignmentOk;
  const completed = raw.override === "MARK_COMPLETE" || naturallyCompleted;

  const hasSubmission = raw.latestSubmissionStatus !== null;
  const hasLessonProgress = counted.some((l) => l.completed);

  return {
    moduleId: raw.moduleId,
    completed,
    started: !completed && (hasLessonProgress || hasSubmission),
    awaitingReview:
      !completed && raw.hasAssignment && raw.latestSubmissionStatus === "SUBMITTED",
    needsChanges:
      !completed && raw.hasAssignment && raw.latestSubmissionStatus === "CHANGES_REQUESTED",
    manuallyUnlocked: raw.override === "UNLOCK" || raw.override === "MARK_COMPLETE",
  };
}

export function toModuleNode(raw: RawModuleState): ModuleNode {
  return { moduleId: raw.moduleId, requiredModuleIds: raw.requiredModuleIds };
}
