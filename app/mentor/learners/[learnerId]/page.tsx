import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";
import { ModuleStatusBadge } from "@/components/module-status-badge";
import { ModuleOverrideControls } from "@/components/module-override-controls";
import { getMentorAssignmentsForUser } from "@/modules/learning/get-mentor-assignments";
import { CreateMentorAssignmentForm } from "@/components/create-mentor-assignment-form";
import { MentorAssignmentReviewForm } from "@/components/mentor-assignment-review-form";
import { getLearnerActivity } from "@/modules/mentor/get-learner-activity";

export default async function MentorLearnerDetailPage({
  params,
}: {
  params: Promise<{ learnerId: string }>;
}) {
  const { learnerId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const role = (session.user as { role?: string }).role;
  const learner = await db.user.findUnique({ where: { id: learnerId } });
  if (!learner) notFound();

  // Mentors can only view their own assigned learners; admins can
  // view anyone. Same rule enforced in review-actions.ts and
  // override-actions.ts.
  if (role === "MENTOR" && learner.mentorId !== session.user.id) {
    redirect("/unauthorized");
  }

  const state = await getEnrolledPathState(learnerId);
  const extraExercises = await getMentorAssignmentsForUser(learnerId);
  const activity = await getLearnerActivity(learnerId);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">{learner.name}</h1>
        <p className="text-sm text-muted-foreground">{learner.email}</p>
      </div>

      {!state ? (
        <p className="text-sm text-muted-foreground">Not enrolled in a path yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">{state.pathName}</h2>
          <ol className="flex flex-col gap-3">
            {state.modules.map((m, i) => {
              const latestSubmission = m.assignment?.submissions[0];
              return (
                <li key={m.id} className="flex flex-col gap-2 rounded-lg border border-border px-4 py-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 text-sm font-medium">{m.title}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {latestSubmission && (
                        <Link
                          href={`/mentor/submissions/${latestSubmission.id}`}
                          className="text-xs text-primary hover:underline"
                        >
                          View submission
                        </Link>
                      )}
                      <ModuleStatusBadge status={m.status} />
                    </div>
                  </div>
                  <ModuleOverrideControls
                    learnerId={learnerId}
                    moduleId={m.id}
                    current={m.override}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Extra exercises</h2>
        <CreateMentorAssignmentForm learnerId={learnerId} />
        {extraExercises.length === 0 ? (
          <p className="text-sm text-muted-foreground">None assigned yet.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {extraExercises.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 rounded-lg border border-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.status}</span>
                </div>
                {item.submissionGithubUrl && (
                  <a
                    href={item.submissionGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    {item.submissionGithubUrl}
                  </a>
                )}
                {item.status === "SUBMITTED" && <MentorAssignmentReviewForm id={item.id} />}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Activity</h2>
        {activity.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reviews or overrides recorded for this learner yet.
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {activity.map((entry, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 rounded-md border border-border px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{entry.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.timestamp.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {entry.subtitle} · {entry.actorName}
                </p>
                {entry.detail && (
                  <p className="text-xs text-muted-foreground">{entry.detail}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
