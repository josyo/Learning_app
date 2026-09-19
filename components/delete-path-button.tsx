"use client";

import { useState, useTransition } from "react";
import { deleteLearningPath } from "@/modules/admin/path-actions";

export function DeletePathButton({ pathId }: { pathId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      try {
        await deleteLearningPath(pathId);
        // On success the action itself redirects — nothing more to do here.
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't delete.");
        setConfirming(false);
      }
    });
  }

  if (error) {
    return <p className="text-xs text-red-600">{error}</p>;
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-red-600 hover:underline"
      >
        Delete
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">Delete this path?</span>
      <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:underline">
        {isPending ? "Deleting…" : "Confirm"}
      </button>
      <button onClick={() => setConfirming(false)} className="text-muted-foreground hover:underline">
        Cancel
      </button>
    </span>
  );
}
