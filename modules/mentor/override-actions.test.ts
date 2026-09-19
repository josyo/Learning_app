import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const getSessionMock = vi.fn();
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: (...args: unknown[]) => getSessionMock(...args) } },
}));

const dbMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
  moduleOverride: { upsert: vi.fn(), deleteMany: vi.fn() },
}));
vi.mock("@/lib/db", () => ({ db: dbMock }));

import { setModuleOverride, clearModuleOverride } from "./override-actions";

describe("module override — permission boundary", () => {
  beforeEach(() => {
    getSessionMock.mockReset();
    dbMock.user.findUnique.mockReset();
    dbMock.moduleOverride.upsert.mockReset();
    dbMock.moduleOverride.deleteMany.mockReset();
  });

  it("throws for a LEARNER session", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "learner1", role: "LEARNER" } });
    await expect(setModuleOverride("learner1", "mod1", "UNLOCK", "")).rejects.toThrow(
      "Only mentors or admins can override module status"
    );
  });

  it("throws when a MENTOR targets a learner who isn't theirs", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "someOtherMentor", role: "MENTOR" } });
    dbMock.user.findUnique.mockResolvedValue({ id: "learner1", mentorId: "mentor1" });

    await expect(setModuleOverride("learner1", "mod1", "UNLOCK", "")).rejects.toThrow(
      "You can only override modules for your own learners"
    );
    expect(dbMock.moduleOverride.upsert).not.toHaveBeenCalled();
  });

  it("throws when the target learner doesn't exist at all", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "mentor1", role: "MENTOR" } });
    dbMock.user.findUnique.mockResolvedValue(null);

    await expect(setModuleOverride("nonexistent", "mod1", "UNLOCK", "")).rejects.toThrow(
      "You can only override modules for your own learners"
    );
  });

  it("succeeds when the MENTOR is the learner's assigned mentor", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "mentor1", role: "MENTOR" } });
    dbMock.user.findUnique.mockResolvedValue({ id: "learner1", mentorId: "mentor1" });

    await setModuleOverride("learner1", "mod1", "MARK_COMPLETE", "caught up in person");
    expect(dbMock.moduleOverride.upsert).toHaveBeenCalledTimes(1);
  });

  it("succeeds for ADMIN without a learner-lookup check at all", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "someAdmin", role: "ADMIN" } });

    await setModuleOverride("anyLearner", "mod1", "UNLOCK", "");
    expect(dbMock.user.findUnique).not.toHaveBeenCalled();
    expect(dbMock.moduleOverride.upsert).toHaveBeenCalledTimes(1);
  });

  it("clearModuleOverride enforces the same ownership boundary as setModuleOverride", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "someOtherMentor", role: "MENTOR" } });
    dbMock.user.findUnique.mockResolvedValue({ id: "learner1", mentorId: "mentor1" });

    await expect(clearModuleOverride("learner1", "mod1")).rejects.toThrow(
      "You can only override modules for your own learners"
    );
    expect(dbMock.moduleOverride.deleteMany).not.toHaveBeenCalled();
  });
});