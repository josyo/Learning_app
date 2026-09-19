"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitAssignment } from "@/modules/learning/submission-actions";

export function SubmissionForm({
  assignmentId,
  isResubmit,
}: {
  assignmentId: string;
  isResubmit: boolean;
}) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await submitAssignment(assignmentId, {
          content,
          githubUrl,
          deployedUrl,
          attachmentUrl,
        });
        setContent("");
        setGithubUrl("");
        setDeployedUrl("");
        setAttachmentUrl("");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Couldn't submit. Try again.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-border p-4"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="githubUrl" className="text-sm font-medium">
          GitHub URL
        </label>
        <input
          id="githubUrl"
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/you/repo"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="deployedUrl" className="text-sm font-medium">
          Deployed URL <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="deployedUrl"
          type="url"
          value={deployedUrl}
          onChange={(e) => setDeployedUrl(e.target.value)}
          placeholder="https://your-project.vercel.app"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="attachmentUrl" className="text-sm font-medium">
          Attachment URL{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="attachmentUrl"
          type="url"
          value={attachmentUrl}
          onChange={(e) => setAttachmentUrl(e.target.value)}
          placeholder="https://example.com/attachment.pdf"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium">
          Notes <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Anything you want your mentor to know about your approach."
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Submitting…" : isResubmit ? "Resubmit" : "Submit"}
      </button>
    </form>
  );
}
