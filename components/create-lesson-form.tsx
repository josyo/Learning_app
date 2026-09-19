"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createLesson } from "@/modules/admin/lesson-actions";

export function CreateLessonForm({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const lessonId = await createLesson(moduleId, title);
        router.push(`/admin/modules/${moduleId}/lessons/${lessonId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't create lesson.");
      }
    });
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-primary hover:underline">
        + Add lesson
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title"
        autoFocus
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Creating…" : "Create"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-xs text-muted-foreground hover:underline"
      >
        Cancel
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
}
