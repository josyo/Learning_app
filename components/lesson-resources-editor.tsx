"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addLessonResource, removeLessonResource } from "@/modules/admin/lesson-actions";

export function LessonResourcesEditor({
  lessonId,
  resources,
}: {
  lessonId: string;
  resources: { id: string; label: string; url: string }[];
}) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await addLessonResource(lessonId, label, url);
        setLabel("");
        setUrl("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't add resource.");
      }
    });
  }

  function handleRemove(resourceId: string) {
    startTransition(async () => {
      await removeLessonResource(resourceId);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {resources.length > 0 && (
        <ul className="flex flex-col gap-1">
          {resources.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-sm"
            >
              <span>
                {r.label} — <span className="text-muted-foreground">{r.url}</span>
              </span>
              <button
                onClick={() => handleRemove(r.id)}
                disabled={isPending}
                className="text-xs text-red-600 hover:underline disabled:opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="flex items-center gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="w-32 rounded-md border border-border bg-background px-2 py-1.5 text-xs"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-xs"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
