"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { moveLessonInModule } from "@/modules/admin/lesson-actions";

export function LessonRowControls({
  moduleId,
  lessonId,
  canMoveUp,
  canMoveDown,
}: {
  moduleId: string;
  lessonId: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function move(direction: "up" | "down") {
    startTransition(async () => {
      await moveLessonInModule(moduleId, lessonId, direction);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => move("up")}
        disabled={isPending || !canMoveUp}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        onClick={() => move("down")}
        disabled={isPending || !canMoveDown}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
        aria-label="Move down"
      >
        ↓
      </button>
      <Link href={`/admin/modules/${moduleId}/lessons/${lessonId}`} className="text-xs text-primary hover:underline">
        Edit
      </Link>
    </div>
  );
}
