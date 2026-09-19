"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAssignment, updateAssignment, deleteAssignment } from "@/modules/admin/assignment-actions";

export function AssignmentEditor({
  moduleId,
  assignment,
}: {
  moduleId: string;
  assignment: { id: string; title: string; instructions: string; submissionCount: number } | null;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(assignment?.title ?? "");
  const [instructions, setInstructions] = useState(assignment?.instructions ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        if (assignment) {
          await updateAssignment(assignment.id, { title, instructions });
        } else {
          await createAssignment(moduleId, title, instructions);
        }
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't save.");
      }
    });
  }

  function handleDelete() {
    if (!assignment) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteAssignment(assignment.id);
        setTitle("");
        setInstructions("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't delete.");
        setConfirmingDelete(false);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {assignment && assignment.submissionCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {assignment.submissionCount} submission(s) exist — editing the instructions won&apos;t
          change past submissions, but it will change what learners see if they resubmit.
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-border p-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="assignment-title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="assignment-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="assignment-instructions" className="text-sm font-medium">
            Instructions <span className="text-muted-foreground">(markdown — put acceptance criteria in here)</span>
          </label>
          <textarea
            id="assignment-instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={8}
            className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "Saving…" : assignment ? "Save" : "Create assignment"}
          </button>
          {saved && !isPending && <span className="text-xs text-muted-foreground">Saved.</span>}
        </div>
      </form>

      {assignment && (
        <div>
          {assignment.submissionCount > 0 ? (
            <p className="text-xs text-muted-foreground">
              Can&apos;t delete — {assignment.submissionCount} submission(s) exist for this
              assignment.
            </p>
          ) : confirmingDelete ? (
            <span className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Delete this assignment?</span>
              <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:underline">
                {isPending ? "Deleting…" : "Confirm"}
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="text-muted-foreground hover:underline"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="text-xs text-red-600 hover:underline"
            >
              Delete assignment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
