"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addPrerequisite, removePrerequisite } from "@/modules/admin/prerequisite-actions";
import type { ModuleLibraryItem } from "@/modules/admin/get-admin-modules";

export function PrerequisiteEditor({
  moduleId,
  current,
  candidates,
}: {
  moduleId: string;
  current: { id: string; title: string }[];
  candidates: ModuleLibraryItem[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    if (!selected) return;
    setError(null);
    startTransition(async () => {
      try {
        await addPrerequisite(moduleId, selected);
        setSelected("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't add prerequisite.");
      }
    });
  }

  function handleRemove(requiredModuleId: string) {
    startTransition(async () => {
      await removePrerequisite(moduleId, requiredModuleId);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {current.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No prerequisites — this module is available from the start of the path.
        </p>
      ) : (
        <ul className="flex flex-col gap-1">
          {current.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-sm"
            >
              <Link href={`/admin/modules/${m.id}`} className="hover:underline">
                {m.title}
              </Link>
              <button
                onClick={() => handleRemove(m.id)}
                disabled={isPending}
                className="text-xs text-red-600 hover:underline disabled:opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {candidates.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">Add a prerequisite…</option>
            {candidates.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
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
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
