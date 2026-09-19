"use client";

import { useTransition } from "react";
import { setLessonCompletion } from "@/modules/learning/actions";

export function MarkCompleteButton({
  lessonId,
  completed,
}: {
  lessonId: string;
  completed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(() => setLessonCompletion(lessonId, !completed))
      }
      disabled={isPending}
      className={`rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 ${
        completed
          ? "border border-border text-muted-foreground"
          : "bg-primary text-primary-foreground"
      }`}
    >
      {isPending ? "Saving…" : completed ? "Mark incomplete" : "Mark complete"}
    </button>
  );
}
