import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminModuleDetail } from "@/modules/admin/get-admin-modules";
import { EditModuleForm } from "@/components/edit-module-form";
import { DeleteModuleButton } from "@/components/delete-module-button";
import { setModulePublished } from "@/modules/admin/module-actions";
import { PublishToggle } from "@/components/publish-toggle";
import { getPrerequisiteCandidates } from "@/modules/admin/get-admin-modules";
import { PrerequisiteEditor } from "@/components/prerequisite-editor";
import { getLessonsForModule } from "@/modules/admin/get-admin-lessons";
import { CreateLessonForm } from "@/components/create-lesson-form";
import { LessonRowControls } from "@/components/lesson-row-controls";
import { getAdminAssignmentForModule } from "@/modules/admin/get-admin-assignment";
import { AssignmentEditor } from "@/components/assignment-editor";

export default async function AdminModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const module = await getAdminModuleDetail(moduleId);
  if (!module) notFound();

  const prerequisiteCandidates = await getPrerequisiteCandidates(moduleId);
  const lessons = await getLessonsForModule(moduleId);
  const assignment = await getAdminAssignmentForModule(moduleId);

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <Link href="/admin/modules" className="text-xs text-muted-foreground hover:underline">
          ← Module library
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{module.title}</h1>
          {/* Same generic PublishToggle used on paths — it takes whichever
              (id, published) => Promise<void> action fits the entity. */}
          <PublishToggle id={module.id} published={module.published} onToggle={setModulePublished} />
        </div>
        <p className="text-xs text-muted-foreground">slug: {module.slug}</p>
      </div>

      {module.usedInPaths.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-semibold text-muted-foreground">Used in</h2>
          <div className="flex flex-wrap gap-2">
            {module.usedInPaths.map((p) => (
              <Link
                key={p.pathId}
                href={`/admin/paths/${p.pathId}`}
                className="rounded-full bg-muted px-2.5 py-1 text-xs hover:bg-border"
              >
                {p.pathName}
              </Link>
            ))}
          </div>
        </div>
      )}

      <EditModuleForm
        moduleId={module.id}
        initialTitle={module.title}
        initialDescription={module.description ?? ""}
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Prerequisites</h2>
        <p className="text-xs text-muted-foreground">
          Modules a learner must complete before this one unlocks.
        </p>
        <PrerequisiteEditor
          moduleId={module.id}
          current={module.prerequisites}
          candidates={prerequisiteCandidates}
        />
      </div>

      {module.requiredBy.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-semibold text-muted-foreground">Required by</h2>
          <div className="flex flex-wrap gap-2">
            {module.requiredBy.map((m) => (
              <Link
                key={m.id}
                href={`/admin/modules/${m.id}`}
                className="rounded-full bg-muted px-2.5 py-1 text-xs hover:bg-border"
              >
                {m.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lessons yet.</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {lessons.map((l, i) => (
              <li
                key={l.id}
                className="flex flex-col gap-2 rounded-md border border-border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  {i + 1}. {l.title} {!l.required && <span className="text-xs text-muted-foreground">(optional)</span>}
                </span>
                <LessonRowControls
                  moduleId={module.id}
                  lessonId={l.id}
                  canMoveUp={i > 0}
                  canMoveDown={i < lessons.length - 1}
                />
              </li>
            ))}
          </ol>
        )}
        <CreateLessonForm moduleId={module.id} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Assignment</h2>
        <AssignmentEditor moduleId={module.id} assignment={assignment} />
      </div>

      <div className="border-t border-border pt-4">
        <DeleteModuleButton moduleId={module.id} />
      </div>
    </div>
  );
}
