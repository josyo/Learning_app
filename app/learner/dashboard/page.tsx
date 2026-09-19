import Link from "next/link";
import { headers } from "next/headers";
import { ChevronRight, Clock3, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { getContinueLearningTarget } from "@/modules/learning/get-continue-learning-target";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export default async function LearnerDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const result = await getContinueLearningTarget(session.user.id);
  const state = await getEnrolledPathState(session.user.id);
  const target = result?.target;

  const totalModules = result?.overallProgress.totalRequiredModules ?? 0;
  const completedModules = result?.overallProgress.completedRequiredModules ?? 0;
  const progressPct = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const activeModules = state?.modules.filter((module) => module.status !== "LOCKED" && module.status !== "COMPLETED").slice(0, 3) ?? [];

  const firstName = session.user.name.split(" ")[0] ?? "Learner";
  const greeting = getGreeting();

  const todaysPlan =
    target?.type === "lesson"
      ? [
          `Finish ${target.lessonTitle}`,
          `Review the current module context`,
          `Move to the next lesson after completion`,
        ]
      : target?.type === "assignment"
        ? [
            `Complete ${target.assignmentTitle}`,
            `Submit your work for mentor review`,
            `Keep the current module moving forward`,
          ]
        : [
            `Review your roadmap progress`,
            `Pick your next unlocked module`,
            `Keep momentum by finishing one lesson today`,
          ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-3 text-4xl tracking-tight text-ink md:text-5xl">
            {greeting}, {firstName}.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[rgba(24,29,26,0.7)]">
            You&apos;re {progressPct}% through your current learning path. Keep building momentum.
          </p>
        </div>

        <div className="surface-panel flex items-center gap-4 px-4 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(33,79,70,0.1)] text-lg font-semibold text-[var(--primary)]">
            {Math.max(progressPct, 0)}%
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.52)]">
              Path progress
            </p>
            <p className="text-sm text-[rgba(24,29,26,0.8)]">
              {completedModules} of {totalModules} modules complete
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <section className="surface-panel p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow">Continue learning</span>
            {target?.type === "lesson" && <span className="pill">{target.moduleTitle}</span>}
          </div>

          {target?.type === "lesson" && (
            <>
              <h2 className="mt-4 text-3xl tracking-tight text-ink md:text-4xl">
                {target.lessonTitle}
              </h2>
              <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
                Module {target.moduleTitle} is the next precise step in your path. Keep going and you&apos;ll build real, usable frontend skills.
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-[rgba(24,29,26,0.68)]">
                  <span>Lesson progress</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(24,29,26,0.08)]">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${Math.min(progressPct + 12, 100)}%` }} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/learner/roadmap/${target.moduleSlug}/${target.lessonSlug}`}
                  className="primary-button"
                >
                  Continue lesson
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/learner/roadmap" className="secondary-button">
                  View roadmap
                </Link>
              </div>
            </>
          )}

          {target?.type === "assignment" && (
            <>
              <h2 className="mt-4 text-3xl tracking-tight text-ink md:text-4xl">
                {target.assignmentTitle}
              </h2>
              <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
                You have a practical assignment ready in {target.moduleTitle}. Complete it to move your learning from theory to proof.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/learner/roadmap/${target.moduleSlug}`}
                  className="primary-button"
                >
                  {target.isResubmit ? "Resubmit work" : "Open assignment"}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </>
          )}

          {target?.type === "awaiting_review" && (
            <>
              <h2 className="mt-4 text-3xl tracking-tight text-ink md:text-4xl">
                Your work is with a mentor.
              </h2>
              <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
                Your latest submission is under review. This is a great place to pause, reflect, and keep preparing for the next milestone.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[rgba(24,29,26,0.7)]">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                Mentor feedback is usually returned after the next review cycle.
              </div>
            </>
          )}

          {!target && (
            <>
              <h2 className="mt-4 text-3xl tracking-tight text-ink md:text-4xl">
                Start your learning journey.
              </h2>
              <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
                Your roadmap is ready. Pick a starting module and begin the first structured lesson.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/learner/roadmap" className="primary-button">
                  Explore the path
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </>
          )}
        </section>

        <aside className="surface-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Today&apos;s plan</p>
            <span className="pill">35 min</span>
          </div>

          <ul className="mt-5 space-y-4">
            {todaysPlan.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(33,79,70,0.08)] text-xs font-semibold text-[var(--primary)]">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-[rgba(24,29,26,0.78)]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-[rgba(24,29,26,0.08)] bg-[rgba(33,79,70,0.04)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.52)]">Focus</p>
            <p className="mt-2 text-sm text-[rgba(24,29,26,0.8)]">
              Keep the next step small and deliberate. One lesson, one assignment, one meaningful improvement.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="surface-panel p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">Learning path</p>
            {state && <span className="pill">{state.pathName}</span>}
          </div>

          {state ? (
            <>
              <h3 className="mt-4 text-2xl tracking-tight text-ink">{state.pathName}</h3>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm text-[rgba(24,29,26,0.68)]">
                  <span>Module progress</span>
                  <span>{completedModules}/{totalModules}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(24,29,26,0.08)]">
                  <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {state.modules.slice(0, 5).map((module) => (
                  <span
                    key={module.id}
                    className={
                      module.status === "COMPLETED"
                        ? "pill bg-[rgba(33,79,70,0.08)] text-[var(--primary)]"
                        : module.status === "LOCKED"
                          ? "pill bg-[rgba(24,29,26,0.04)] text-[rgba(24,29,26,0.52)]"
                          : "pill bg-[rgba(185,117,68,0.08)] text-[var(--warning)]"
                    }
                  >
                    {module.title}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-[rgba(24,29,26,0.68)]">
              You&apos;re not enrolled in a path yet. Ask an admin to assign one and the learning path will appear here.
            </p>
          )}
        </section>

        <section className="surface-panel p-6">
          <p className="eyebrow">Momentum</p>
          <ul className="mt-5 space-y-4">
            <li className="flex items-start justify-between gap-3 rounded-2xl border border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.4)] p-3">
              <div>
                <p className="text-sm font-medium text-ink">Next milestone</p>
                <p className="text-xs text-[rgba(24,29,26,0.62)]">
                  {target?.type === "lesson" ? target.moduleTitle : "Keep the path moving"}
                </p>
              </div>
              <Sparkles className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
            </li>
            <li className="flex items-start justify-between gap-3 rounded-2xl border border-[rgba(24,29,26,0.08)] bg-[rgba(255,255,255,0.4)] p-3">
              <div>
                <p className="text-sm font-medium text-ink">Current streak</p>
                <p className="text-xs text-[rgba(24,29,26,0.62)]">3 learning days</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">Active</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="eyebrow">Current modules</p>
          <Link href="/learner/roadmap" className="text-sm font-medium text-[var(--primary)] hover:underline">
            View all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeModules.length > 0 ? (
            activeModules.map((module) => (
              <Link key={module.id} href={`/learner/roadmap/${module.slug}`} className="surface-panel block p-5 transition-transform hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="pill bg-[rgba(33,79,70,0.06)] text-[var(--primary)]">{module.status}</span>
                  <ChevronRight className="h-4 w-4 text-[rgba(24,29,26,0.52)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl text-ink">{module.title}</h3>
                {module.description && (
                  <p className="mt-2 text-sm leading-6 text-[rgba(24,29,26,0.7)]">{module.description}</p>
                )}
                <div className="mt-4 text-sm font-medium text-[var(--primary)]">Open module</div>
              </Link>
            ))
          ) : (
            <div className="surface-panel p-5 md:col-span-2 xl:col-span-3">
              <p className="text-sm text-[rgba(24,29,26,0.7)]">
                You&apos;re caught up for now. Pick a new roadmap module when you&apos;re ready to continue.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
