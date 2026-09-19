"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { reviewSubmission } from "@/modules/mentor/review-actions";

export function ReviewForm({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(decision: "APPROVED" | "CHANGES_REQUESTED") {
    setError(null);
    startTransition(async () => {
      try {
        await reviewSubmission(submissionId, decision, feedback);
        router.push("/mentor/dashboard");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't submit review.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="feedback" className="text-sm font-medium">
          Feedback
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder="What's working, and what needs to change before approval."
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => submit("APPROVED")}
          disabled={isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => submit("CHANGES_REQUESTED")}
          disabled={isPending}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          Request changes
        </button>
      </div>
    </div>
  );
}
