"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { getModuleDetailForUser } from "@/modules/learning/get-module-detail";
import { createNotification } from "@/modules/notifications/create-notification";

export async function submitAssignment(
  assignmentId: string,
  data: { content: string; githubUrl: string; deployedUrl: string; attachmentUrl?: string }
) {
  const session = await requireRole(["LEARNER"]);

  if (!data.content.trim() && !data.githubUrl.trim() && !data.deployedUrl.trim() && !data.attachmentUrl?.trim()) {
    throw new Error("Submission needs at least one of: notes, GitHub link, deployed URL, or attachment URL.");
  }

  const assignment = await db.assignment.findUnique({
    where: { id: assignmentId },
    include: { module: { select: { slug: true, title: true } } },
  });
  if (!assignment) throw new Error("Assignment not found");

  // Re-check the module is actually unlocked for this learner — the
  // page only shows the form when it is, but a Server Action is a
  // public endpoint and can't rely on that.
  const moduleDetail = await getModuleDetailForUser(session.user.id, assignment.module.slug);
  if (!moduleDetail || !moduleDetail.unlocked) {
    throw new Error("This module is locked");
  }

  const learner = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, mentorId: true },
  });

  const submission = await db.submission.create({
    data: {
      assignmentId,
      userId: session.user.id,
      content: data.content.trim() || null,
      githubUrl: data.githubUrl.trim() || null,
      deployedUrl: data.deployedUrl.trim() || null,
      attachmentUrl: data.attachmentUrl?.trim() || null,
      status: "SUBMITTED",
    },
  });

  if (learner?.mentorId) {
    await createNotification(
      learner.mentorId,
      "NEW_SUBMISSION",
      `New submission from ${learner.name}`,
      `${assignment.title} · ${assignment.module.title}`,
      `/mentor/submissions/${submission.id}`
    );
  }

  revalidatePath("/learner/roadmap");
  revalidatePath(`/learner/roadmap/${assignment.module.slug}`);
  revalidatePath("/learner/dashboard");

  // A new submission adds to the mentor's pending-review queue —
  // same class of bug as review-actions.ts not revalidating the
  // learner side; needs the mirror image here.
  revalidatePath("/mentor/dashboard");
  revalidatePath(`/mentor/learners/${session.user.id}`);
}
