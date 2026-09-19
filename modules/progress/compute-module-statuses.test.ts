import { describe, it, expect } from "vitest";
import { computeModuleStatuses, type ModuleNode, type LearnerModuleState } from "./compute-module-statuses";

function state(overrides: Partial<LearnerModuleState> = {}): LearnerModuleState {
  return {
    moduleId: "",
    completed: false,
    started: false,
    awaitingReview: false,
    needsChanges: false,
    manuallyUnlocked: false,
    ...overrides,
  };
}

describe("computeModuleStatuses", () => {
  it("marks the first module Available with no prerequisites and no progress", () => {
    const modules: ModuleNode[] = [{ moduleId: "orientation", requiredModuleIds: [] }];
    const result = computeModuleStatuses(modules, new Map());
    expect(result.get("orientation")).toBe("AVAILABLE");
  });

  it("locks a module until its prerequisite is completed", () => {
    const modules: ModuleNode[] = [
      { moduleId: "html", requiredModuleIds: [] },
      { moduleId: "css", requiredModuleIds: ["html"] },
    ];
    const learnerState = new Map<string, LearnerModuleState>([
      ["html", state({ completed: false })],
    ]);
    const result = computeModuleStatuses(modules, learnerState);
    expect(result.get("css")).toBe("LOCKED");
  });

  it("unlocks a module once its prerequisite is completed", () => {
    const modules: ModuleNode[] = [
      { moduleId: "html", requiredModuleIds: [] },
      { moduleId: "css", requiredModuleIds: ["html"] },
    ];
    const learnerState = new Map<string, LearnerModuleState>([
      ["html", state({ completed: true })],
    ]);
    const result = computeModuleStatuses(modules, learnerState);
    expect(result.get("css")).toBe("AVAILABLE");
  });

  it("requires ALL prerequisites to be completed, not just one", () => {
    const modules: ModuleNode[] = [
      { moduleId: "js", requiredModuleIds: [] },
      { moduleId: "git", requiredModuleIds: [] },
      { moduleId: "typescript", requiredModuleIds: ["js", "git"] },
    ];
    const learnerState = new Map<string, LearnerModuleState>([
      ["js", state({ completed: true })],
      // git not completed
    ]);
    const result = computeModuleStatuses(modules, learnerState);
    expect(result.get("typescript")).toBe("LOCKED");
  });

  it("a mentor override unlocks a module regardless of prerequisites", () => {
    const modules: ModuleNode[] = [
      { moduleId: "html", requiredModuleIds: [] },
      { moduleId: "css", requiredModuleIds: ["html"] },
    ];
    const learnerState = new Map<string, LearnerModuleState>([
      ["css", state({ manuallyUnlocked: true })],
    ]);
    const result = computeModuleStatuses(modules, learnerState);
    expect(result.get("css")).toBe("AVAILABLE");
  });

  it("reflects Awaiting Review and Needs Changes ahead of the lock check", () => {
    const modules: ModuleNode[] = [{ moduleId: "capstone", requiredModuleIds: ["unfinished"] }];

    const awaiting = computeModuleStatuses(
      modules,
      new Map([["capstone", state({ awaitingReview: true })]])
    );
    expect(awaiting.get("capstone")).toBe("AWAITING_REVIEW");

    const needsChanges = computeModuleStatuses(
      modules,
      new Map([["capstone", state({ needsChanges: true })]])
    );
    expect(needsChanges.get("capstone")).toBe("NEEDS_CHANGES");
  });

  it("marks a completed module Completed even if later re-locked by new prerequisites", () => {
    const modules: ModuleNode[] = [{ moduleId: "html", requiredModuleIds: [] }];
    const result = computeModuleStatuses(
      modules,
      new Map([["html", state({ completed: true })]])
    );
    expect(result.get("html")).toBe("COMPLETED");
  });
});
