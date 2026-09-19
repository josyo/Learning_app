"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createModuleAndPlaceInPath } from "@/modules/admin/module-actions";

export function CreateModuleForm({ pathId }: { pathId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await createModuleAndPlaceInPath(pathId, title, description);
        setTitle("");
        setDescription("");
        setOpen(false);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't create module.");
      }
    });
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-primary hover:underline">
        + Create a new module
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-md border border-border p-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Module title"
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Creating…" : "Create & add"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
