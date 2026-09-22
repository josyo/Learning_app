import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export default async function LearnerProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const state = await getEnrolledPathState(session.user.id);

  const projectMilestones =
    state?.modules.filter((module) => module.status !== "LOCKED").slice(0, 4) ??
    [];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink">
          Portfolio milestones
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[rgba(24,29,26,0.72)]">
          Practical learning outcomes built from the curriculum. Each milestone
          turns course concepts into portfolio-ready work.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projectMilestones.length === 0 ? (
          <div className="surface-panel p-5 md:col-span-2 xl:col-span-4">
            <p className="text-sm text-[rgba(24,29,26,0.7)]">
              No project milestones are available yet. Complete your first
              unlocked module to start building them.
            </p>
          </div>
        ) : (
          projectMilestones.map((module, index) => (
            <div key={module.id} className="surface-panel p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="pill bg-[rgba(33,79,70,0.06)] text-[var(--primary)]">
                  Milestone {index + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
                  {module.status}
                </span>
              </div>
              <h2 className="mt-4 text-xl text-ink">{module.title}</h2>
              {module.description && (
                <p className="mt-2 text-sm leading-6 text-[rgba(24,29,26,0.68)]">
                  {module.description}
                </p>
              )}
              <Link
                href={`/learner/roadmap/${module.slug}`}
                className="mt-4 inline-flex text-sm font-medium text-[var(--primary)] hover:underline"
              >
                Open milestone →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
