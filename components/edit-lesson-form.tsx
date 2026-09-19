"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLesson } from "@/modules/admin/lesson-actions";

export function EditLessonForm({
  lessonId,
  initialTitle,
  initialContent,
  initialVideoUrl,
  initialRequired,
}: {
  lessonId: string;
  initialTitle: string;
  initialContent: string;
  initialVideoUrl: string;
  initialRequired: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [required, setRequired] = useState(initialRequired);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updateLesson(lessonId, { title, content, videoUrl, required });
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't save.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lesson-title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="lesson-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lesson-content" className="text-sm font-medium">
          Content <span className="text-muted-foreground">(markdown)</span>
        </label>
        <textarea
          id="lesson-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lesson-video" className="text-sm font-medium">
          Video URL <span className="text-muted-foreground">(optional, embeddable)</span>
        </label>
        <input
          id="lesson-video"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/embed/..."
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
        Required for module completion
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
        {saved && !isPending && <span className="text-xs text-muted-foreground">Saved.</span>}
      </div>
    </form>
  );
}
