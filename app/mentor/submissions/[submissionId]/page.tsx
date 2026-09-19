import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewForm } from "@/components/review-form";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Awaiting review",
  APPROVED: "Approved",
  CHANGES_REQUESTED: "Changes requested",
};

export default async function SubmissionReviewPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const role = (session.user as { role?: string }).role;

  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: {
      user: true,
      assignment: { include: { module: true } },
      reviews: { orderBy: { createdAt: "desc" }, include: { reviewer: true } },
    },
  });
  if (!submission) notFound();

  if (role === "MENTOR" && submission.user.mentorId !== session.user.id) {
    redirect("/unauthorized");
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">
          {submission.user.name} · {submission.assignment.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {submission.assignment.module.title} ·{" "}
          {STATUS_LABEL[submission.status]}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Assignment instructions</h2>
        <article className="prose prose-sm max-w-none rounded-lg border border-border p-4">
          <ReactMarkdown>{submission.assignment.instructions}</ReactMarkdown>
        </article>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Submission</h2>
        <div className="flex flex-col gap-2 rounded-lg border border-border p-4 text-sm">
          {submission.githubUrl && (
            <p>
              GitHub:{" "}
              <a
                href={submission.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {submission.githubUrl}
              </a>
            </p>
          )}
          {submission.deployedUrl && (
            <p>
              Deployed:{" "}
              <a
                href={submission.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {submission.deployedUrl}
              </a>
            </p>
          )}
          {submission.attachmentUrl && (
            <p>
              Attachment:{" "}
              <a
                href={submission.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {submission.attachmentUrl}
              </a>
            </p>
          )}
          {submission.content && (
            <p className="whitespace-pre-wrap text-muted-foreground">
              {submission.content}
            </p>
          )}
        </div>
      </div>

      {submission.reviews.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Review history</h2>
          {submission.reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-md border border-border px-3 py-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {r.reviewer.name} · {STATUS_LABEL[r.decision]}
                </p>
                <span className="text-xs text-muted-foreground">
                  {r.createdAt.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{r.feedback}</p>
            </div>
          ))}
        </div>
      )}

      {submission.status !== "SUBMITTED" && (
        <p className="text-sm text-muted-foreground">
          Already reviewed as <strong>{STATUS_LABEL[submission.status]}</strong>
          . Submitting another review below will replace that decision — useful
          if you reviewed by mistake.
        </p>
      )}
      <ReviewForm submissionId={submission.id} />
    </div>
  );
}
