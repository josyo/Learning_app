"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createNotification } from "@/modules/notifications/create-notification";

export async function reviewSubmission(
  submissionId: string,
  decision: "APPROVED" | "CHANGES_REQUESTED",
  feedback: string
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  const role = (session.user as { role?: string }).role;
  if (role !== "MENTOR" && role !== "ADMIN") {
    throw new Error("Only mentors or admins can review submissions");
  }

  if (!feedback.trim()) {
    throw new Error("Feedback is required — the learner needs to know why.");
  }

  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: { user: true, assignment: { include: { module: true } } },
  });
  if (!submission) throw new Error("Submission not found");

  // A MENTOR can only review their own assigned learners; ADMIN can
  // review anyone. This is intentionally simple for MVP — it doesn't
  // yet account for per-enrollment mentor assignment (Enrollment.mentorId)
  // diverging from the learner's default User.mentorId.
  if (role === "MENTOR" && submission.user.mentorId !== session.user.id) {
    throw new Error("You can only review submissions from your own learners");
  }

  await db.submissionReview.create({
    data: {
      submissionId,
      reviewerId: session.user.id,
      decision,
      feedback: feedback.trim(),
    },
  });

  await db.submission.update({
    where: { id: submissionId },
    data: { status: decision },
  });

  await createNotification(
    submission.userId,
    "REVIEW_OUTCOME",
    decision === "APPROVED"
      ? `${submission.assignment.title} approved`
      : `Changes requested on ${submission.assignment.title}`,
    `${submission.assignment.module.title} · ${feedback.trim()}`,
    `/learner/roadmap/${submission.assignment.module.slug}`
  );

  revalidatePath("/mentor/dashboard");
  revalidatePath(`/mentor/learners/${submission.userId}`);
  revalidatePath(`/mentor/submissions/${submissionId}`);

  // A review decision directly changes what the learner sees — their
  // dashboard's Continue Learning target, the roadmap's module
  // statuses (this one and possibly the next one unlocking), and the
  // module page's submission history. All three need invalidating,
  // not just the mentor-side pages.
  revalidatePath("/learner/dashboard");
  revalidatePath("/learner/roadmap");
  revalidatePath(`/learner/roadmap/${submission.assignment.module.slug}`);
}
