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
  submission: { findUnique: vi.fn(), update: vi.fn() },
  submissionReview: { create: vi.fn() },
}));
vi.mock("@/lib/db", () => ({ db: dbMock }));

const createNotificationMock = vi.fn();
vi.mock("@/modules/notifications/create-notification", () => ({
  createNotification: (...args: unknown[]) => createNotificationMock(...args),
}));

import { reviewSubmission } from "./review-actions";

const FAKE_SUBMISSION = {
  id: "sub1",
  userId: "learner1",
  user: { id: "learner1", mentorId: "mentor1" },
  assignment: {
    title: "Environment setup",
    module: { title: "Developer Orientation", slug: "developer-orientation" },
  },
};

describe("reviewSubmission — permission boundary", () => {
  beforeEach(() => {
    getSessionMock.mockReset();
    dbMock.submission.findUnique.mockReset();
    dbMock.submission.update.mockReset();
    dbMock.submissionReview.create.mockReset();
    createNotificationMock.mockReset();
    dbMock.submission.findUnique.mockResolvedValue(FAKE_SUBMISSION);
  });

  it("throws when there is no session", async () => {
    getSessionMock.mockResolvedValue(null);
    await expect(reviewSubmission("sub1", "APPROVED", "good work")).rejects.toThrow(
      "Not authenticated"
    );
  });

  it("throws for a LEARNER session — learners can't review anything", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "learner1", role: "LEARNER" } });
    await expect(reviewSubmission("sub1", "APPROVED", "good work")).rejects.toThrow(
      "Only mentors or admins can review submissions"
    );
  });

  it("throws when a MENTOR reviews a submission from a learner who isn't theirs", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "someOtherMentor", role: "MENTOR" } });
    await expect(reviewSubmission("sub1", "APPROVED", "good work")).rejects.toThrow(
      "You can only review submissions from your own learners"
    );
    expect(dbMock.submissionReview.create).not.toHaveBeenCalled();
  });

  it("succeeds when the MENTOR is the learner's assigned mentor", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "mentor1", role: "MENTOR" } });
    await reviewSubmission("sub1", "APPROVED", "good work");
    expect(dbMock.submissionReview.create).toHaveBeenCalledTimes(1);
    expect(dbMock.submission.update).toHaveBeenCalledWith({
      where: { id: "sub1" },
      data: { status: "APPROVED" },
    });
  });

  it("succeeds when an ADMIN reviews any learner's submission, regardless of mentor assignment", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "someAdmin", role: "ADMIN" } });
    await reviewSubmission("sub1", "CHANGES_REQUESTED", "needs work");
    expect(dbMock.submissionReview.create).toHaveBeenCalledTimes(1);
  });

  it("throws when feedback is empty, before ever touching the database", async () => {
    getSessionMock.mockResolvedValue({ user: { id: "mentor1", role: "MENTOR" } });
    await expect(reviewSubmission("sub1", "APPROVED", "   ")).rejects.toThrow(
      "Feedback is required"
    );
    expect(dbMock.submission.findUnique).not.toHaveBeenCalled();
  });
});