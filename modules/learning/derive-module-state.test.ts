import { describe, it, expect } from "vitest";
import { deriveLearnerModuleState, type RawLesson, type RawModuleState } from "./derive-module-state";

function raw(overrides: Partial<RawModuleState> = {}): RawModuleState {
  return {
    moduleId: "m1",
    requiredModuleIds: [],
    lessons: [],
    hasAssignment: false,
    latestSubmissionStatus: null,
    override: null,
    ...overrides,
  };
}

/** Required, live lessons with the given completion flags. */
const required = (...completed: boolean[]): RawLesson[] =>
  completed.map((c) => ({ required: true, archived: false, completed: c }));
const archived = (completed: boolean): RawLesson => ({ required: true, archived: true, completed });

describe("deriveLearnerModuleState", () => {
  it("is not completed if it has no lessons and no assignment (unauthored)", () => {
    const state = deriveLearnerModuleState(raw());
    expect(state.completed).toBe(false);
    expect(state.started).toBe(false);
  });

  it("completes on lessons alone when there is no assignment", () => {
    const state = deriveLearnerModuleState(raw({ lessons: required(true, true), hasAssignment: false }));
    expect(state.completed).toBe(true);
  });

  it("does NOT complete on lessons alone when an assignment exists but isn't approved", () => {
    const state = deriveLearnerModuleState(
      raw({ lessons: required(true, true), hasAssignment: true, latestSubmissionStatus: null })
    );
    expect(state.completed).toBe(false);
  });

  it("completes only once lessons are done AND the assignment is approved", () => {
    const state = deriveLearnerModuleState(
      raw({ lessons: required(true, true), hasAssignment: true, latestSubmissionStatus: "APPROVED" })
    );
    expect(state.completed).toBe(true);
  });

  it("reports awaitingReview when submitted but lessons are also done", () => {
    const state = deriveLearnerModuleState(
      raw({ lessons: required(true), hasAssignment: true, latestSubmissionStatus: "SUBMITTED" })
    );
    expect(state.awaitingReview).toBe(true);
    expect(state.completed).toBe(false);
  });

  it("reports needsChanges after a Changes Requested review", () => {
    const state = deriveLearnerModuleState(
      raw({ lessons: required(true), hasAssignment: true, latestSubmissionStatus: "CHANGES_REQUESTED" })
    );
    expect(state.needsChanges).toBe(true);
  });

  it("a MARK_COMPLETE override completes the module regardless of state", () => {
    const state = deriveLearnerModuleState(
      raw({
        lessons: required(false, false),
        hasAssignment: true,
        latestSubmissionStatus: "CHANGES_REQUESTED",
        override: "MARK_COMPLETE",
      })
    );
    expect(state.completed).toBe(true);
  });

  it("an UNLOCK override does not itself complete the module", () => {
    const state = deriveLearnerModuleState(raw({ lessons: required(false), override: "UNLOCK" }));
    expect(state.completed).toBe(false);
    expect(state.manuallyUnlocked).toBe(true);
  });

  describe("optional lessons", () => {
    it("ignores a not-required lesson for completion", () => {
      const state = deriveLearnerModuleState(
        raw({ lessons: [...required(true), { required: false, archived: false, completed: false }] })
      );
      expect(state.completed).toBe(true);
    });
  });

  describe("archived lessons", () => {
    it("an incomplete archived lesson does not block completion", () => {
      // The real case: stale seed lessons left behind after a content rewrite.
      const state = deriveLearnerModuleState(
        raw({ lessons: [...required(true, true), archived(false), archived(false)], hasAssignment: true, latestSubmissionStatus: "APPROVED" })
      );
      expect(state.completed).toBe(true);
    });

    it("a live incomplete lesson still blocks, even alongside archived complete ones", () => {
      const state = deriveLearnerModuleState(raw({ lessons: [...required(true, false), archived(true)] }));
      expect(state.completed).toBe(false);
    });

    it("progress on an archived lesson does not count as started", () => {
      const state = deriveLearnerModuleState(raw({ lessons: [...required(false), archived(true)] }));
      expect(state.started).toBe(false);
    });

    it("a module whose only lessons are archived and has no assignment is unauthored, not complete", () => {
      const state = deriveLearnerModuleState(raw({ lessons: [archived(true), archived(true)] }));
      expect(state.completed).toBe(false);
    });

    it("a module with only archived lessons still completes via its approved assignment", () => {
      const state = deriveLearnerModuleState(
        raw({ lessons: [archived(false)], hasAssignment: true, latestSubmissionStatus: "APPROVED" })
      );
      expect(state.completed).toBe(true);
    });

    it("un-archiving restores the learner's earlier completion (progress was never lost)", () => {
      const flags = { required: true, completed: true };
      const whileArchived = deriveLearnerModuleState(raw({ lessons: [{ ...flags, archived: true }, ...required(false)] }));
      const afterRestore = deriveLearnerModuleState(raw({ lessons: [{ ...flags, archived: false }, ...required(false)] }));
      expect(whileArchived.started).toBe(false);
      expect(afterRestore.started).toBe(true);
    });
  });
});
