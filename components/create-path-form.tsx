"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createLearningPath } from "@/modules/admin/path-actions";

export function CreatePathForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const pathId = await createLearningPath(name, description);
        setName("");
        setDescription("");
        setOpen(false);
        router.push(`/admin/paths/${pathId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't create path.");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        + New path
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="path-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="path-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Backend Development / Node.js"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="path-description" className="text-sm font-medium">
          Description <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="path-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Creating…" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        New paths start unpublished — learners won&apos;t see it until you publish it.
      </p>
    </form>
  );
}
