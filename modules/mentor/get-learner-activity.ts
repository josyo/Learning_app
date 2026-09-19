import { db } from "@/lib/db";

export interface ActivityEntry {
  type: "review" | "override" | "extra_review";
  title: string; // e.g. assignment title or module title
  subtitle: string; // context: module name, override action, etc.
  actorName: string;
  detail: string | null; // feedback or override note
  timestamp: Date;
}

export async function getLearnerActivity(learnerId: string): Promise<ActivityEntry[]> {
  const [reviews, overrides, extraAssignments] = await Promise.all([
    db.submissionReview.findMany({
      where: { submission: { userId: learnerId } },
      include: {
        reviewer: { select: { name: true } },
        submission: { include: { assignment: { include: { module: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.moduleOverride.findMany({
      where: { userId: learnerId },
      include: { mentor: { select: { name: true } }, module: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
    db.mentorAssignment.findMany({
      where: { userId: learnerId, status: { in: ["APPROVED", "CHANGES_REQUESTED"] } },
      include: { mentor: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const entries: ActivityEntry[] = [
    ...reviews.map((r) => ({
      type: "review" as const,
      title: r.submission.assignment.title,
      subtitle: `${r.submission.assignment.module.title} · ${r.decision === "APPROVED" ? "Approved" : "Changes requested"}`,
      actorName: r.reviewer.name,
      detail: r.feedback,
      timestamp: r.createdAt,
    })),
    ...overrides.map((o) => ({
      type: "override" as const,
      title: o.module.title,
      subtitle: o.action === "MARK_COMPLETE" ? "Marked complete (override)" : "Unlocked (override)",
      actorName: o.mentor.name,
      detail: o.note,
      timestamp: o.createdAt,
    })),
    // MentorAssignment has no separate review-history table (see the
    // schema comment on it) — its own updatedAt doubles as the
    // review timestamp, and there's no way to tell who reviewed it
    // apart from who assigned it, so the assigning mentor's name is
    // shown here as an approximation, not a verified reviewer.
    ...extraAssignments.map((e) => ({
      type: "extra_review" as const,
      title: e.title,
      subtitle: `Extra exercise · ${e.status === "APPROVED" ? "Approved" : "Changes requested"}`,
      actorName: e.mentor.name,
      detail: e.feedback,
      timestamp: e.updatedAt,
    })),
  ];

  entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  return entries;
}
