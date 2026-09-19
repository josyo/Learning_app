import Link from "next/link";
import { getAdminPaths } from "@/modules/admin/get-admin-paths";
import { CreatePathForm } from "@/components/create-path-form";
import { PublishToggle } from "@/components/publish-toggle";
import { setPathPublished } from "@/modules/admin/path-actions";

export default async function AdminPathsPage() {
  const paths = await getAdminPaths();

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Learning paths</h1>
          <p className="text-sm text-muted-foreground">
            Click a path to manage its modules, lessons, and assignments.
          </p>
        </div>
      </div>

      <CreatePathForm />

      {paths.length === 0 ? (
        <p className="text-sm text-muted-foreground">No paths yet — create one above.</p>
      ) : (
        <ol className="flex flex-col gap-2">
          {paths.map((path) => (
            <li
              key={path.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
            >
              <Link href={`/admin/paths/${path.id}`} className="min-w-0 flex-1 hover:underline">
                <p className="text-sm font-medium">{path.name}</p>
                <p className="text-xs text-muted-foreground">
                  {path.moduleCount} module(s) · {path.enrollmentCount} enrolled
                </p>
              </Link>
              <PublishToggle id={path.id} published={path.published} onToggle={setPathPublished} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
