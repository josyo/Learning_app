"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { reviewMentorAssignment } from "@/modules/mentor/mentor-assignment-actions";

export function MentorAssignmentReviewForm({ id }: { id: string }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(decision: "APPROVED" | "CHANGES_REQUESTED") {
    setError(null);
    startTransition(async () => {
      try {
        await reviewMentorAssignment(id, decision, feedback);
        setFeedback("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't submit review.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-border p-3">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Feedback"
        rows={2}
        className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={() => submit("APPROVED")}
          disabled={isPending}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => submit("CHANGES_REQUESTED")}
          disabled={isPending}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Request changes
        </button>
      </div>
    </div>
  );
}
