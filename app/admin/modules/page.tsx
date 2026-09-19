import Link from "next/link";
import { getModuleLibrary } from "@/modules/admin/get-admin-modules";

export default async function AdminModulesPage() {
  const modules = await getModuleLibrary();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Module library</h1>
        <p className="text-sm text-muted-foreground">
          Modules are reusable across paths — create them from a path&apos;s page, or edit an
          existing one here.
        </p>
      </div>

      {modules.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No modules yet — create one from a learning path&apos;s page.
        </p>
      ) : (
        <ol className="flex flex-col gap-2">
          {modules.map((m) => (
            <li key={m.id}>
              <Link
                href={`/admin/modules/${m.id}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 hover:bg-muted"
              >
                <span className="min-w-0 truncate text-sm font-medium">{m.title}</span>
                <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                  {m.pathCount} path(s) · {m.published ? "Published" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
