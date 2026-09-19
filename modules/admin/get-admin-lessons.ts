import { db } from "@/lib/db";

export interface AdminLessonSummary {
  id: string;
  slug: string;
  title: string;
  order: number;
  required: boolean;
}

export async function getLessonsForModule(moduleId: string): Promise<AdminLessonSummary[]> {
  const lessons = await db.lesson.findMany({
    where: { moduleId },
    orderBy: { order: "asc" },
  });

  return lessons.map((l) => ({ id: l.id, slug: l.slug, title: l.title, order: l.order, required: l.required }));
}

export interface AdminLessonDetail {
  id: string;
  moduleId: string;
  moduleTitle: string;
  slug: string;
  title: string;
  content: string;
  videoUrl: string | null;
  required: boolean;
  resources: { id: string; label: string; url: string }[];
  completedByCount: number; // for display
  hasAnyProgress: boolean; // for the delete guard — true even if only "started", not completed
}

export async function getAdminLessonDetail(lessonId: string): Promise<AdminLessonDetail | null> {
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { select: { title: true } },
      resources: true,
      progress: true,
    },
  });

  if (!lesson) return null;

  return {
    id: lesson.id,
    moduleId: lesson.moduleId,
    moduleTitle: lesson.module.title,
    slug: lesson.slug,
    title: lesson.title,
    content: lesson.content,
    videoUrl: lesson.videoUrl,
    required: lesson.required,
    resources: lesson.resources.map((r) => ({ id: r.id, label: r.label, url: r.url })),
    completedByCount: lesson.progress.filter((p) => p.completed).length,
    hasAnyProgress: lesson.progress.length > 0,
  };
}
