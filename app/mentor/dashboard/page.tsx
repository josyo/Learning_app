import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getMentorDashboardData } from "@/modules/mentor/get-mentor-dashboard";
import { EmptyState } from "@/components/empty-state";
import { CheckCircle2, Users } from "lucide-react";

export default async function MentorDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const { learners, pendingReviews } = await getMentorDashboardData(session.user.id);

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Mentor dashboard</h1>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">
          Pending reviews {pendingReviews.length > 0 && `(${pendingReviews.length})`}
        </h2>
        {pendingReviews.length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
            Nothing waiting on you right now.
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {pendingReviews.map((r, i) => (
              <li key={i}>
                <Link
                  href={r.href}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {r.learnerName} · {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.subtitle} {r.isResubmit && "· resubmission"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {r.submittedAt.toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Your learners</h2>
        {learners.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No learners assigned yet"
            description="Once an admin assigns a learner to you as their mentor, they'll show up here."
          />
        ) : (
          <ol className="flex flex-col gap-2">
            {learners.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/mentor/learners/${l.id}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.pathName ?? "Not enrolled"}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {l.completedModules}/{l.totalModules} modules
                    {l.pendingReviewCount > 0 && ` · ${l.pendingReviewCount} pending`}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
