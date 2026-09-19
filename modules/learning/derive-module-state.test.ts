import { describe, it, expect } from "vitest";
import { deriveLearnerModuleState, type RawModuleState } from "./derive-module-state";

function raw(overrides: Partial<RawModuleState> = {}): RawModuleState {
  return {
    moduleId: "m1",
    requiredModuleIds: [],
    requiredLessonCompletions: [],
    hasAssignment: false,
    latestSubmissionStatus: null,
    override: null,
    ...overrides,
  };
}

describe("deriveLearnerModuleState", () => {
  it("is not completed if it has no lessons and no assignment (unauthored)", () => {
    const state = deriveLearnerModuleState(raw());
    expect(state.completed).toBe(false);
    expect(state.started).toBe(false);
  });

  it("completes on lessons alone when there is no assignment", () => {
    const state = deriveLearnerModuleState(
      raw({ requiredLessonCompletions: [true, true], hasAssignment: false })
    );
    expect(state.completed).toBe(true);
  });

  it("does NOT complete on lessons alone when an assignment exists but isn't approved", () => {
    const state = deriveLearnerModuleState(
      raw({
        requiredLessonCompletions: [true, true],
        hasAssignment: true,
        latestSubmissionStatus: null,
      })
    );
    expect(state.completed).toBe(false);
  });

  it("completes only once lessons are done AND the assignment is approved", () => {
    const state = deriveLearnerModuleState(
      raw({
        requiredLessonCompletions: [true, true],
        hasAssignment: true,
        latestSubmissionStatus: "APPROVED",
      })
    );
    expect(state.completed).toBe(true);
  });

  it("reports awaitingReview when submitted but lessons are also done", () => {
    const state = deriveLearnerModuleState(
      raw({
        requiredLessonCompletions: [true],
        hasAssignment: true,
        latestSubmissionStatus: "SUBMITTED",
      })
    );
    expect(state.awaitingReview).toBe(true);
    expect(state.completed).toBe(false);
  });

  it("reports needsChanges after a Changes Requested review", () => {
    const state = deriveLearnerModuleState(
      raw({
        requiredLessonCompletions: [true],
        hasAssignment: true,
        latestSubmissionStatus: "CHANGES_REQUESTED",
      })
    );
    expect(state.needsChanges).toBe(true);
  });

  it("a MARK_COMPLETE override completes the module regardless of state", () => {
    const state = deriveLearnerModuleState(
      raw({
        requiredLessonCompletions: [false, false],
        hasAssignment: true,
        latestSubmissionStatus: "CHANGES_REQUESTED",
        override: "MARK_COMPLETE",
      })
    );
    expect(state.completed).toBe(true);
  });

  it("an UNLOCK override does not itself complete the module", () => {
    const state = deriveLearnerModuleState(
      raw({ requiredLessonCompletions: [false], override: "UNLOCK" })
    );
    expect(state.completed).toBe(false);
    expect(state.manuallyUnlocked).toBe(true);
  });
});
