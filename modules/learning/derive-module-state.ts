import type { LearnerModuleState, ModuleNode } from "@/modules/progress/compute-module-statuses";

export type SubmissionStatus = "SUBMITTED" | "APPROVED" | "CHANGES_REQUESTED";
export type OverrideAction = "MARK_COMPLETE" | "UNLOCK";

export interface RawModuleState {
  moduleId: string;
  requiredModuleIds: string[];
  requiredLessonCompletions: boolean[]; // one entry per required lesson, true if complete
  hasAssignment: boolean;
  latestSubmissionStatus: SubmissionStatus | null;
  override: OverrideAction | null;
}

/**
 * A module is "complete" once every required lesson is done AND
 * (if the module has an assignment) that assignment's latest
 * submission is APPROVED. A module with no lessons and no
 * assignment yet (unauthored) can never complete on its own — there
 * has to be something to actually finish.
 *
 * A mentor's MARK_COMPLETE override short-circuits all of that.
 * UNLOCK only bypasses the prerequisite lock — normal completion
 * rules still apply on top of it.
 */
export function deriveLearnerModuleState(raw: RawModuleState): LearnerModuleState {
  const hasLessons = raw.requiredLessonCompletions.length > 0;
  const lessonsOk = hasLessons
    ? raw.requiredLessonCompletions.every(Boolean)
    : true;
  const assignmentOk = raw.hasAssignment
    ? raw.latestSubmissionStatus === "APPROVED"
    : true;
  const hasContent = hasLessons || raw.hasAssignment;

  const naturallyCompleted = hasContent && lessonsOk && assignmentOk;
  const completed = raw.override === "MARK_COMPLETE" || naturallyCompleted;

  const hasSubmission = raw.latestSubmissionStatus !== null;
  const hasLessonProgress = raw.requiredLessonCompletions.some(Boolean);

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
