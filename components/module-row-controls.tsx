"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  moveModuleInPath,
  removeModuleFromPath,
  setModulePublished,
} from "@/modules/admin/module-actions";

export function ModuleRowControls({
  pathId,
  moduleId,
  published,
  canMoveUp,
  canMoveDown,
}: {
  pathId: string;
  moduleId: string;
  published: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => run(() => moveModuleInPath(pathId, moduleId, "up"))}
        disabled={isPending || !canMoveUp}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        onClick={() => run(() => moveModuleInPath(pathId, moduleId, "down"))}
        disabled={isPending || !canMoveDown}
        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
        aria-label="Move down"
      >
        ↓
      </button>
      <button
        onClick={() => run(() => setModulePublished(moduleId, !published))}
        disabled={isPending}
        className={`rounded-full px-2 py-0.5 text-xs font-medium disabled:opacity-50 ${
          published ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"
        }`}
      >
        {published ? "Published" : "Draft"}
      </button>
      <Link href={`/admin/modules/${moduleId}`} className="text-xs text-primary hover:underline">
        Edit
      </Link>
      <button
        onClick={() => run(() => removeModuleFromPath(pathId, moduleId))}
        disabled={isPending}
        className="text-xs text-red-600 hover:underline disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}
