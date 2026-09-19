"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireMentorForLearner(learnerId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");

  const role = (session.user as { role?: string }).role;
  if (role !== "MENTOR" && role !== "ADMIN") {
    throw new Error("Only mentors or admins can override module status");
  }

  if (role === "MENTOR") {
    const learner = await db.user.findUnique({ where: { id: learnerId } });
    if (!learner || learner.mentorId !== session.user.id) {
      throw new Error("You can only override modules for your own learners");
    }
  }

  return session;
}

export async function setModuleOverride(
  learnerId: string,
  moduleId: string,
  action: "MARK_COMPLETE" | "UNLOCK",
  note: string
) {
  const session = await requireMentorForLearner(learnerId);

  await db.moduleOverride.upsert({
    where: { userId_moduleId: { userId: learnerId, moduleId } },
    update: { action, note: note.trim() || null, mentorId: session.user.id },
    create: {
      userId: learnerId,
      moduleId,
      mentorId: session.user.id,
      action,
      note: note.trim() || null,
    },
  });

  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
  revalidatePath(`/mentor/learners/${learnerId}`);
}

export async function clearModuleOverride(learnerId: string, moduleId: string) {
  await requireMentorForLearner(learnerId);

  await db.moduleOverride.deleteMany({ where: { userId: learnerId, moduleId } });

  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
  revalidatePath(`/mentor/learners/${learnerId}`);
}
