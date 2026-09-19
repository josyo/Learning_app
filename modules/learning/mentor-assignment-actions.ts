"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createNotification } from "@/modules/notifications/create-notification";

export async function submitMentorAssignment(
  mentorAssignmentId: string,
  data: { content: string; githubUrl: string; deployedUrl: string }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  if (!data.content.trim() && !data.githubUrl.trim() && !data.deployedUrl.trim()) {
    throw new Error("Submission needs at least one of: notes, GitHub link, or deployed URL.");
  }

  const item = await db.mentorAssignment.findUnique({ where: { id: mentorAssignmentId } });
  if (!item) throw new Error("Not found");
  if (item.userId !== session.user.id) throw new Error("Not authorized");
  if (item.status !== "ASSIGNED" && item.status !== "CHANGES_REQUESTED") {
    throw new Error("This exercise isn't open for submission right now");
  }

  await db.mentorAssignment.update({
    where: { id: mentorAssignmentId },
    data: {
      submissionContent: data.content.trim() || null,
      submissionGithubUrl: data.githubUrl.trim() || null,
      submissionDeployedUrl: data.deployedUrl.trim() || null,
      status: "SUBMITTED",
      feedback: null, // clear prior feedback — it applied to the previous attempt
    },
  });

  await createNotification(
    item.mentorId,
    "NEW_SUBMISSION",
    `${session.user.name} submitted ${item.title}`,
    null,
    `/mentor/learners/${session.user.id}`
  );

  revalidatePath("/learner/extra");
  revalidatePath(`/mentor/learners/${session.user.id}`);
  revalidatePath("/mentor/dashboard");
}
