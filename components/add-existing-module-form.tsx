"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { placeModuleInPath } from "@/modules/admin/module-actions";
import type { ModuleLibraryItem } from "@/modules/admin/get-admin-modules";

export function AddExistingModuleForm({
  pathId,
  candidates,
}: {
  pathId: string;
  candidates: ModuleLibraryItem[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (candidates.length === 0) return null;

  function handleAdd() {
    if (!selected) return;
    setError(null);
    startTransition(async () => {
      try {
        await placeModuleInPath(pathId, selected);
        setSelected("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't add module.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        >
          <option value="">Add an existing module…</option>
          {candidates.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title} {m.pathCount > 0 && `(used in ${m.pathCount} path${m.pathCount > 1 ? "s" : ""})`}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          disabled={!selected || isPending}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          {isPending ? "Adding…" : "Add"}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
