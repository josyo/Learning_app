"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";

/**
 * Toggles a lesson's completion for the current user. Auth is
 * re-checked here even though the page that calls this is already
 * behind the learner layout's role gate — a Server Action is a
 * public endpoint by nature, so it can't rely on the page around it.
 */
export async function setLessonCompletion(lessonId: string, completed: boolean) {
  const session = await requireRole(["LEARNER"]);

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: { moduleId: true, module: { select: { slug: true } } },
  });
  if (!lesson) {
    throw new Error("Lesson not found");
  }

  await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    update: { completed, completedAt: completed ? new Date() : null },
    create: {
      userId: session.user.id,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null,
    },
  });

  // Revalidate both the roadmap (status may have changed) and this
  // module's own page (lesson checkmark).
  revalidatePath("/learner/roadmap");
  revalidatePath(`/learner/roadmap/${lesson.module.slug}`);
}
