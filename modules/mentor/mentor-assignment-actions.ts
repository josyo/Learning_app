"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createNotification } from "@/modules/notifications/create-notification";

async function requireMentorForLearner(learnerId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  const role = (session.user as { role?: string }).role;
  if (role !== "MENTOR" && role !== "ADMIN") {
    throw new Error("Only mentors or admins can do this");
  }

  if (role === "MENTOR") {
    const learner = await db.user.findUnique({ where: { id: learnerId } });
    if (!learner || learner.mentorId !== session.user.id) {
      throw new Error("You can only manage exercises for your own learners");
    }
  }

  return session;
}

export async function createMentorAssignment(
  learnerId: string,
  title: string,
  instructions: string
) {
  const session = await requireMentorForLearner(learnerId);

  if (!title.trim() || !instructions.trim()) {
    throw new Error("Title and instructions are both required");
  }

  await db.mentorAssignment.create({
    data: {
      userId: learnerId,
      mentorId: session.user.id,
      title: title.trim(),
      instructions: instructions.trim(),
      status: "ASSIGNED",
    },
  });

  await createNotification(
    learnerId,
    "NEW_ASSIGNMENT",
    `New extra exercise: ${title.trim()}`,
    null,
    "/learner/extra"
  );

  revalidatePath(`/mentor/learners/${learnerId}`);
  revalidatePath("/mentor/dashboard");
  revalidatePath("/learner/extra");
}

export async function reviewMentorAssignment(
  mentorAssignmentId: string,
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

  const item = await db.mentorAssignment.findUnique({ where: { id: mentorAssignmentId } });
  if (!item) throw new Error("Not found");

  if (role === "MENTOR") {
    const learner = await db.user.findUnique({ where: { id: item.userId } });
    if (!learner || learner.mentorId !== session.user.id) {
      throw new Error("You can only review exercises for your own learners");
    }
  }

  await db.mentorAssignment.update({
    where: { id: mentorAssignmentId },
    data: { status: decision, feedback: feedback.trim() },
  });

  await createNotification(
    item.userId,
    "REVIEW_OUTCOME",
    decision === "APPROVED" ? `${item.title} approved` : `Changes requested on ${item.title}`,
    feedback.trim(),
    "/learner/extra"
  );

  revalidatePath(`/mentor/learners/${item.userId}`);
  revalidatePath("/mentor/dashboard");
  revalidatePath("/learner/extra");
}
