import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPathDetail } from "@/modules/admin/get-admin-paths";
import { EditPathForm } from "@/components/edit-path-form";
import { PublishToggle } from "@/components/publish-toggle";
import { setPathPublished } from "@/modules/admin/path-actions";
import { DeletePathButton } from "@/components/delete-path-button";
import { getModulesNotInPath } from "@/modules/admin/get-admin-modules";
import { AddExistingModuleForm } from "@/components/add-existing-module-form";
import { CreateModuleForm } from "@/components/create-module-form";
import { ModuleRowControls } from "@/components/module-row-controls";

export default async function AdminPathDetailPage({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = await params;
  const path = await getAdminPathDetail(pathId);
  if (!path) notFound();

  const availableModules = await getModulesNotInPath(pathId);

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <Link href="/admin/paths" className="text-xs text-muted-foreground hover:underline">
          ← All paths
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{path.name}</h1>
          <PublishToggle id={path.id} published={path.published} onToggle={setPathPublished} />
        </div>
        <p className="text-xs text-muted-foreground">
          {path.enrollmentCount} learner(s) enrolled · slug: {path.slug}
        </p>
      </div>

      <EditPathForm pathId={path.id} initialName={path.name} initialDescription={path.description ?? ""} />

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Modules</h2>
        {path.modules.length === 0 ? (
          <p className="text-sm text-muted-foreground">No modules yet.</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {path.modules.map((m, i) => (
              <li
                key={m.id}
                className="flex flex-col gap-2 rounded-md border border-border px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  {i + 1}. {m.title}
                </span>
                <ModuleRowControls
                  pathId={path.id}
                  moduleId={m.id}
                  published={m.published}
                  canMoveUp={i > 0}
                  canMoveDown={i < path.modules.length - 1}
                />
              </li>
            ))}
          </ol>
        )}

        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <AddExistingModuleForm pathId={path.id} candidates={availableModules} />
          <CreateModuleForm pathId={path.id} />
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <DeletePathButton pathId={path.id} />
      </div>
    </div>
  );
}
