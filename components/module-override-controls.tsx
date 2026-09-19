"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setModuleOverride, clearModuleOverride } from "@/modules/mentor/override-actions";

export function ModuleOverrideControls({
  learnerId,
  moduleId,
  current,
}: {
  learnerId: string;
  moduleId: string;
  current: { action: "MARK_COMPLETE" | "UNLOCK"; note: string | null } | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();

  function apply(action: "MARK_COMPLETE" | "UNLOCK") {
    startTransition(async () => {
      await setModuleOverride(learnerId, moduleId, action, note);
      setOpen(false);
      setNote("");
      router.refresh();
    });
  }

  function clear() {
    startTransition(async () => {
      await clearModuleOverride(learnerId, moduleId);
      router.refresh();
    });
  }

  if (!open) {
    return (
      <div className="flex items-center gap-2">
        {current && (
          <span className="text-xs text-muted-foreground">
            Override: {current.action === "MARK_COMPLETE" ? "Marked complete" : "Unlocked"}
          </span>
        )}
        <button
          onClick={() => setOpen(true)}
          className="text-xs text-primary hover:underline"
        >
          {current ? "Change override" : "Override"}
        </button>
        {current && (
          <button
            onClick={clear}
            disabled={isPending}
            className="text-xs text-muted-foreground hover:underline disabled:opacity-50"
          >
            Clear
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-border p-3">
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Reason (optional, visible to the learner)"
        className="rounded-md border border-border bg-background px-2 py-1 text-xs"
      />
      <div className="flex gap-2">
        <button
          onClick={() => apply("MARK_COMPLETE")}
          disabled={isPending}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
        >
          Mark complete
        </button>
        <button
          onClick={() => apply("UNLOCK")}
          disabled={isPending}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Unlock only
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
