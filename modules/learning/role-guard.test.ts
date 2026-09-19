import { describe, it, expect, vi, beforeEach } from "vitest";

const getSessionMock = vi.fn();
const requireRoleMock = vi.fn();
const lessonFindUniqueMock = vi.fn();
const lessonProgressUpsertMock = vi.fn();
const assignmentFindUniqueMock = vi.fn();
const userFindUniqueMock = vi.fn();
const submissionCreateMock = vi.fn();
const notificationCreateMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: getSessionMock,
    },
  },
}));

vi.mock("@/lib/session", () => ({
  requireRole: requireRoleMock,
}));

vi.mock("@/lib/db", () => ({
  db: {
    lesson: { findUnique: lessonFindUniqueMock },
    lessonProgress: { upsert: lessonProgressUpsertMock },
    assignment: { findUnique: assignmentFindUniqueMock },
    user: { findUnique: userFindUniqueMock },
    submission: { create: submissionCreateMock },
  },
}));

vi.mock("@/modules/notifications/create-notification", () => ({
  createNotification: notificationCreateMock,
}));

const { setLessonCompletion } = await import("./actions");
const { submitAssignment } = await import("./submission-actions");

describe("learner server action guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSessionMock.mockResolvedValue({ user: { id: "u1", role: "MENTOR" } });
    requireRoleMock.mockRejectedValue(new Error("Only learners can do this"));
    lessonFindUniqueMock.mockResolvedValue({
      moduleId: "m1",
      module: { slug: "orientation" },
    });
    lessonProgressUpsertMock.mockResolvedValue({});
    assignmentFindUniqueMock.mockResolvedValue({
      id: "a1",
      module: { slug: "orientation", title: "Orientation" },
    });
    userFindUniqueMock.mockResolvedValue({ name: "Mentor Person", mentorId: "mentor-1" });
    submissionCreateMock.mockResolvedValue({ id: "s1" });
  });

  it("rejects a mentor session before marking a lesson complete", async () => {
    await expect(setLessonCompletion("lesson-1", true)).rejects.toThrow("Only learners can do this");
    expect(requireRoleMock).toHaveBeenCalledWith(["LEARNER"]);
  });

  it("rejects a mentor or admin session before submitting assignment work", async () => {
    await expect(
      submitAssignment("assignment-1", { content: "hello", githubUrl: "", deployedUrl: "" })
    ).rejects.toThrow("Only learners can do this");
    expect(requireRoleMock).toHaveBeenCalledWith(["LEARNER"]);
  });
});
