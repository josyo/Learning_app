import { db } from "@/lib/db";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export interface MentorLearnerSummary {
  id: string;
  name: string;
  email: string;
  pathName: string | null;
  completedModules: number;
  totalModules: number;
  pendingReviewCount: number;
}

export interface PendingReview {
  learnerId: string;
  learnerName: string;
  title: string; // e.g. "Semantic profile page" or an extra exercise's title
  subtitle: string; // module title, or "Extra exercise" for mentor-assigned ones
  isResubmit: boolean;
  submittedAt: Date;
  href: string; // where to go to review it — differs by kind, so computed here once
}

export interface MentorDashboardData {
  learners: MentorLearnerSummary[];
  pendingReviews: PendingReview[]; // oldest first — review queue order
}

/**
 * Iterates each assigned learner's enrolled-path state (the same
 * function the learner-side roadmap uses) for core assignments, plus
 * a direct MentorAssignment query for extra exercises — these are
 * two different systems (see the schema comment on MentorAssignment
 * for why), so they're pulled in separately and merged into one
 * queue here rather than pretending they're the same thing upstream.
 */
export async function getMentorDashboardData(mentorId: string): Promise<MentorDashboardData> {
  const learners = await db.user.findMany({
    where: { mentorId },
    orderBy: { name: "asc" },
  });

  const summaries: MentorLearnerSummary[] = [];
  const pendingReviews: PendingReview[] = [];

  for (const learner of learners) {
    const state = await getEnrolledPathState(learner.id);

    const completedModules = state?.modules.filter((m) => m.status === "COMPLETED").length ?? 0;
    const totalModules = state?.modules.length ?? 0;

    let pendingReviewCount = 0;

    for (const module of state?.modules ?? []) {
      const latest = module.assignment?.submissions[0];
      if (latest?.status === "SUBMITTED") {
        pendingReviewCount++;
        pendingReviews.push({
          learnerId: learner.id,
          learnerName: learner.name,
          title: module.assignment!.title,
          subtitle: module.title,
          isResubmit: module.assignment!.submissions.length > 1,
          submittedAt: latest.createdAt,
          href: `/mentor/submissions/${latest.id}`,
        });
      }
    }

    const pendingExtra = await db.mentorAssignment.findMany({
      where: { userId: learner.id, status: "SUBMITTED" },
    });
    for (const item of pendingExtra) {
      pendingReviewCount++;
      pendingReviews.push({
        learnerId: learner.id,
        learnerName: learner.name,
        title: item.title,
        subtitle: "Extra exercise",
        isResubmit: false, // MentorAssignment has no attempt history to check
        submittedAt: item.updatedAt,
        href: `/mentor/learners/${learner.id}`,
      });
    }

    summaries.push({
      id: learner.id,
      name: learner.name,
      email: learner.email,
      pathName: state?.pathName ?? null,
      completedModules,
      totalModules,
      pendingReviewCount,
    });
  }

  pendingReviews.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());

  return { learners: summaries, pendingReviews };
}