import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { auth } from "@/lib/auth";
import { getModuleDetailForUser } from "@/modules/learning/get-module-detail";
import { SubmissionForm } from "@/components/submission-form";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "Awaiting review",
  APPROVED: "Approved",
  CHANGES_REQUESTED: "Changes requested",
};

const STATUS_CLASS: Record<string, string> = {
  SUBMITTED: "bg-violet-50 text-violet-700",
  APPROVED: "bg-green-50 text-green-700",
  CHANGES_REQUESTED: "bg-red-50 text-red-700",
};

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const detail = await getModuleDetailForUser(session.user.id, moduleSlug);
  if (!detail || !detail.unlocked) notFound();

  const assignment = detail.assignment;
  if (!assignment) notFound();

  const latestSubmission = assignment.submissions[0] ?? null;
  const canSubmit =
    !latestSubmission || latestSubmission.status === "CHANGES_REQUESTED";

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Link
          href={`/learner/roadmap/${moduleSlug}`}
          className="text-xs text-muted-foreground hover:underline"
        >
          ← Back to module
        </Link>
        <h1 className="text-xl font-semibold">{assignment.title}</h1>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Assignment instructions</h2>
        <article className="prose prose-sm max-w-none rounded-lg border border-border p-4">
          <ReactMarkdown>{assignment.instructions}</ReactMarkdown>
        </article>
      </div>

      {assignment.submissions.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Submission history</h2>
            {latestSubmission && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASS[latestSubmission.status]}`}
              >
                {STATUS_LABEL[latestSubmission.status]}
              </span>
            )}
          </div>
          {assignment.submissions.map((s, i) => (
            <div
              key={s.id}
              className="rounded-md border border-border px-3 py-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Attempt {assignment.submissions.length - i}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${STATUS_CLASS[s.status]}`}
                >
                  {STATUS_LABEL[s.status]}
                </span>
              </div>
              {s.githubUrl && (
                <p className="mt-1">
                  GitHub:{" "}
                  <a
                    href={s.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {s.githubUrl}
                  </a>
                </p>
              )}
              {s.deployedUrl && (
                <p className="mt-1">
                  Deployed:{" "}
                  <a
                    href={s.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {s.deployedUrl}
                  </a>
                </p>
              )}
              {s.attachmentUrl && (
                <p className="mt-1">
                  Attachment:{" "}
                  <a
                    href={s.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {s.attachmentUrl}
                  </a>
                </p>
              )}
              {s.content && (
                <p className="mt-1 whitespace-pre-wrap text-muted-foreground">
                  {s.content}
                </p>
              )}
              {s.latestReviewFeedback && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Mentor feedback: {s.latestReviewFeedback}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {canSubmit && (
        <SubmissionForm
          assignmentId={assignment.id}
          isResubmit={assignment.submissions.length > 0}
        />
      )}
    </div>
  );
}
