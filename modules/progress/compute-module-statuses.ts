/**
 * Computes each module's roadmap status for a learner within one
 * learning path.
 *
 * This is deliberately a pure function with no Prisma/DB calls
 * inside it — callers fetch the data, this just computes. That's
 * what makes it unit-testable in isolation, which the build roadmap
 * calls out as the highest-risk piece of business logic in the MVP.
 *
 * Phase 2 only has enough data to distinguish Locked vs Available
 * (no lessons/assignments exist yet). IN_PROGRESS, AWAITING_REVIEW,
 * NEEDS_CHANGES, and COMPLETED become reachable once Phase 3
 * (LessonProgress) and Phase 4 (Submission/SubmissionReview) land —
 * the type already models all six so the roadmap UI doesn't need to
 * change shape later, only this function's internals do.
 */

export type ModuleStatus =
  | "LOCKED"
  | "AVAILABLE"
  | "IN_PROGRESS"
  | "AWAITING_REVIEW"
  | "NEEDS_CHANGES"
  | "COMPLETED";

export interface ModuleNode {
  moduleId: string;
  /** Other module IDs that must be COMPLETED before this one unlocks. */
  requiredModuleIds: string[];
}

export interface LearnerModuleState {
  moduleId: string;
  /** True once every required lesson + required assignment is approved (Phase 3/4). */
  completed: boolean;
  /** True if the learner has started but not completed the module (Phase 3). */
  started: boolean;
  /** True if a submission is awaiting mentor review (Phase 4). */
  awaitingReview: boolean;
  /** True if the mentor requested changes and it's unresolved (Phase 4). */
  needsChanges: boolean;
  /** Mentor/admin override — bypasses prerequisite locking regardless of state. */
  manuallyUnlocked: boolean;
}

export function computeModuleStatuses(
  modules: ModuleNode[],
  learnerState: Map<string, LearnerModuleState>
): Map<string, ModuleStatus> {
  const statuses = new Map<string, ModuleStatus>();
  const completedIds = new Set(
    modules
      .map((m) => m.moduleId)
      .filter((id) => learnerState.get(id)?.completed)
  );

  for (const module of modules) {
    const state = learnerState.get(module.moduleId);

    if (state?.completed) {
      statuses.set(module.moduleId, "COMPLETED");
      continue;
    }

    if (state?.needsChanges) {
      statuses.set(module.moduleId, "NEEDS_CHANGES");
      continue;
    }

    if (state?.awaitingReview) {
      statuses.set(module.moduleId, "AWAITING_REVIEW");
      continue;
    }

    const prerequisitesMet =
      state?.manuallyUnlocked ||
      module.requiredModuleIds.every((reqId) => completedIds.has(reqId));

    if (!prerequisitesMet) {
      statuses.set(module.moduleId, "LOCKED");
      continue;
    }

    statuses.set(module.moduleId, state?.started ? "IN_PROGRESS" : "AVAILABLE");
  }

  return statuses;
}
