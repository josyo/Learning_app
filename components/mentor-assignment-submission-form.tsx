"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitMentorAssignment } from "@/modules/learning/mentor-assignment-actions";

export function MentorAssignmentSubmissionForm({ id }: { id: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await submitMentorAssignment(id, { content, githubUrl, deployedUrl });
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't submit.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        placeholder="GitHub URL"
        className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
      />
      <input
        value={deployedUrl}
        onChange={(e) => setDeployedUrl(e.target.value)}
        placeholder="Deployed URL (optional)"
        className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Notes (optional)"
        rows={2}
        className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
