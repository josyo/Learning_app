import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getModuleDetailForUser } from "@/modules/learning/get-module-detail";
import { CheckCircle2, Circle } from "lucide-react";

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

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const detail = await getModuleDetailForUser(session.user.id, moduleSlug);
  if (!detail || !detail.unlocked) notFound();

  const latestSubmission = detail.assignment?.submissions[0] ?? null;
  const canSubmit =
    !latestSubmission || latestSubmission.status === "CHANGES_REQUESTED";

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">{detail.title}</h1>
        {detail.description && (
          <p className="text-sm text-muted-foreground">{detail.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Lessons</h2>
        {detail.lessons.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
            Lessons for this module haven&apos;t been authored yet.
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {detail.lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <Link
                  href={`/learner/roadmap/${detail.slug}/${lesson.slug}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 hover:bg-muted"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span className="min-w-0 text-sm font-medium">
                      {index + 1}. {lesson.title}
                    </span>
                    {!lesson.required && (
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>

      {detail.assignment && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Assignment: {detail.assignment.title}
            </h2>
            {latestSubmission && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASS[latestSubmission.status]}`}
              >
                {STATUS_LABEL[latestSubmission.status]}
              </span>
            )}
          </div>

          <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            Review the assignment brief, then submit your work from the
            dedicated assignment page.
          </div>

          <Link
            href={`/learner/roadmap/${detail.slug}/assignment`}
            className="inline-flex w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Open assignment
          </Link>
        </div>
      )}
    </div>
  );
}
