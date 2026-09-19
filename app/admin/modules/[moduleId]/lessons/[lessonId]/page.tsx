import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminLessonDetail } from "@/modules/admin/get-admin-lessons";
import { EditLessonForm } from "@/components/edit-lesson-form";
import { LessonResourcesEditor } from "@/components/lesson-resources-editor";
import { DeleteLessonButton } from "@/components/delete-lesson-button";

export default async function AdminLessonDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  const lesson = await getAdminLessonDetail(lessonId);
  if (!lesson || lesson.moduleId !== moduleId) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <Link href={`/admin/modules/${moduleId}`} className="text-xs text-muted-foreground hover:underline">
          ← {lesson.moduleTitle}
        </Link>
        <h1 className="mt-1 text-xl font-semibold">{lesson.title}</h1>
        {lesson.completedByCount > 0 && (
          <p className="text-xs text-muted-foreground">
            Completed by {lesson.completedByCount} learner(s).
          </p>
        )}
      </div>

      <EditLessonForm
        lessonId={lesson.id}
        initialTitle={lesson.title}
        initialContent={lesson.content}
        initialVideoUrl={lesson.videoUrl ?? ""}
        initialRequired={lesson.required}
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Resources</h2>
        <LessonResourcesEditor lessonId={lesson.id} resources={lesson.resources} />
      </div>

      <div className="border-t border-border pt-4">
        {lesson.hasAnyProgress ? (
          <p className="text-xs text-muted-foreground">
            This lesson can&apos;t be deleted — at least one learner has progress on it, and
            deleting would destroy that history. If your goal is just to stop it being
            mandatory, mark it not-required above instead; that won&apos;t remove existing
            progress, but it does change what counts toward module completion going forward.
          </p>
        ) : (
          <DeleteLessonButton lessonId={lesson.id} />
        )}
      </div>
    </div>
  );
}