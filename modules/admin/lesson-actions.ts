"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin, slugify } from "@/modules/admin/require-admin";

async function uniqueLessonSlug(moduleId: string, title: string) {
  const baseSlug = slugify(title);
  if (!baseSlug) throw new Error("Title must contain at least one letter or number");

  let slug = baseSlug;
  let suffix = 2;
  while (await db.lesson.findUnique({ where: { moduleId_slug: { moduleId, slug } } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }
  return slug;
}

async function revalidateModuleAndLearnerPaths(moduleId: string) {
  revalidatePath(`/admin/modules/${moduleId}`);
  const module = await db.module.findUnique({ where: { id: moduleId }, select: { slug: true } });
  if (module) {
    revalidatePath(`/learner/roadmap/${module.slug}`);
  }
  revalidatePath("/learner/dashboard");
}

/** Quick-creates a lesson with just a title — full editing happens on its own page. */
export async function createLesson(moduleId: string, title: string) {
  await requireAdmin();
  if (!title.trim()) throw new Error("Title is required");

  const slug = await uniqueLessonSlug(moduleId, title);
  const last = await db.lesson.findFirst({ where: { moduleId }, orderBy: { order: "desc" } });
  const order = (last?.order ?? -1) + 1;

  const lesson = await db.lesson.create({
    data: { moduleId, slug, title: title.trim(), order, content: "", required: true },
  });

  await revalidateModuleAndLearnerPaths(moduleId);
  return lesson.id;
}

export async function updateLesson(
  lessonId: string,
  data: { title: string; content: string; videoUrl: string; required: boolean }
) {
  await requireAdmin();
  if (!data.title.trim()) throw new Error("Title is required");

  const lesson = await db.lesson.update({
    where: { id: lessonId },
    data: {
      title: data.title.trim(),
      content: data.content,
      videoUrl: data.videoUrl.trim() || null,
      required: data.required,
    },
  });

  revalidatePath(`/admin/modules/${lesson.moduleId}/lessons/${lessonId}`);
  // required affects module completion, so this can change unlock
  // status downstream — not just the lesson's own content.
  await revalidateModuleAndLearnerPaths(lesson.moduleId);
}

export async function deleteLesson(lessonId: string) {
  await requireAdmin();

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { progress: { select: { id: true }, take: 1 } },
  });
  if (!lesson) throw new Error("Not found");

  // Lesson -> LessonProgress cascades on delete. Refuse if any
  // learner has interacted with this lesson at all, same principle
  // as the module/path delete guards — don't silently destroy a
  // learner's history.
  if (lesson.progress.length > 0) {
    throw new Error(
      "Can't delete — at least one learner has progress on this lesson, and deleting would destroy that history. Marking it not-required is a non-destructive alternative if the goal is just to make it optional."
    );
  }

  const moduleId = lesson.moduleId;
  await db.lesson.delete({ where: { id: lessonId } });

  await revalidateModuleAndLearnerPaths(moduleId);
  redirect(`/admin/modules/${moduleId}`);
}

export async function moveLessonInModule(
  moduleId: string,
  lessonId: string,
  direction: "up" | "down"
) {
  await requireAdmin();

  const lessons = await db.lesson.findMany({ where: { moduleId }, orderBy: { order: "asc" } });
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) throw new Error("Lesson not found in this module");

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= lessons.length) return;

  const current = lessons[index];
  const swapWith = lessons[swapIndex];
  if (!current || !swapWith) return;

  // order has a unique constraint per module — stage through a
  // temporary value to avoid a mid-transaction collision, same
  // pattern as moveModuleInPath.
  await db.$transaction([
    db.lesson.update({ where: { id: current.id }, data: { order: -1 } }),
    db.lesson.update({ where: { id: swapWith.id }, data: { order: current.order } }),
    db.lesson.update({ where: { id: current.id }, data: { order: swapWith.order } }),
  ]);

  await revalidateModuleAndLearnerPaths(moduleId);
}

export async function addLessonResource(lessonId: string, label: string, url: string) {
  await requireAdmin();
  if (!label.trim() || !url.trim()) throw new Error("Label and URL are both required");

  const lesson = await db.lesson.findUnique({ where: { id: lessonId }, select: { moduleId: true } });
  if (!lesson) throw new Error("Not found");

  await db.lessonResource.create({ data: { lessonId, label: label.trim(), url: url.trim() } });

  revalidatePath(`/admin/modules/${lesson.moduleId}/lessons/${lessonId}`);
  revalidatePath(`/learner/roadmap`);
}

export async function removeLessonResource(resourceId: string) {
  await requireAdmin();

  const resource = await db.lessonResource.findUnique({
    where: { id: resourceId },
    include: { lesson: { select: { id: true, moduleId: true } } },
  });
  if (!resource) return;

  await db.lessonResource.delete({ where: { id: resourceId } });

  revalidatePath(`/admin/modules/${resource.lesson.moduleId}/lessons/${resource.lesson.id}`);
}