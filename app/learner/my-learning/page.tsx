import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export default async function MyLearningPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const state = await getEnrolledPathState(session.user.id);
  if (!state) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">My learning</p>
        <h1 className="mt-3 text-4xl text-ink">Start your path</h1>
        <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
          You&apos;re not enrolled in a learning path yet. Once assigned, your in-progress modules and completed lessons will appear here.
        </p>
      </div>
    );
  }

  const inProgress = state.modules.filter(
    (module) => module.status !== "LOCKED" && module.status !== "COMPLETED",
  );
  const completed = state.modules.filter((module) => module.status === "COMPLETED");

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="eyebrow">My learning</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink">Your active learning space</h1>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="surface-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">In progress</p>
            <span className="pill">{inProgress.length} modules</span>
          </div>

          <ul className="mt-5 space-y-3">
            {inProgress.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-[rgba(24,29,26,0.12)] p-4 text-sm text-[rgba(24,29,26,0.7)]">
                You don&apos;t have any active modules yet. Choose the next module on your roadmap to begin.
              </li>
            ) : (
              inProgress.slice(0, 5).map((module) => (
                <li key={module.id} className="rounded-2xl border border-[rgba(24,29,26,0.08)] bg-white/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Link href={`/learner/roadmap/${module.slug}`} className="text-lg font-semibold text-ink hover:underline">
                      {module.title}
                    </Link>
                    <span className="pill bg-[rgba(185,117,68,0.08)] text-[var(--warning)]">{module.status}</span>
                  </div>
                  {module.description && (
                    <p className="mt-2 text-sm leading-6 text-[rgba(24,29,26,0.68)]">{module.description}</p>
                  )}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="surface-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Completed</p>
            <span className="pill">{completed.length} modules</span>
          </div>

          <ul className="mt-5 space-y-3">
            {completed.length === 0 ? (
              <li className="rounded-2xl border border-dashed border-[rgba(24,29,26,0.12)] p-4 text-sm text-[rgba(24,29,26,0.7)]">
                Complete your first module to build a visible learning record here.
              </li>
            ) : (
              completed.slice(0, 5).map((module) => (
                <li key={module.id} className="rounded-2xl border border-[rgba(24,29,26,0.08)] bg-white/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Link href={`/learner/roadmap/${module.slug}`} className="text-lg font-semibold text-ink hover:underline">
                      {module.title}
                    </Link>
                    <span className="pill bg-[rgba(33,79,70,0.08)] text-[var(--primary)]">Complete</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <section className="mt-6 surface-panel p-6">
        <p className="eyebrow">Saved</p>
        <p className="mt-4 text-base text-[rgba(24,29,26,0.68)]">
          Bookmarks and notes are designed to help you revisit difficult concepts without losing your learning flow. Use them after each lesson to consolidate ideas while the material is still fresh.
        </p>
      </section>
    </div>
  );
}
