import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export default async function LearnerProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const state = await getEnrolledPathState(session.user.id);
  const completedModules =
    state?.modules.filter((module) => module.status === "COMPLETED").length ??
    0;
  const totalModules = state?.modules.length ?? 0;
  const progress =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <p className="eyebrow">Profile</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink">
          {session.user.name}
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="surface-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
            Current path
          </p>
          <p className="mt-3 text-xl font-semibold text-ink">
            {state?.pathName ?? "Not assigned"}
          </p>
        </div>
        <div className="surface-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
            Progress
          </p>
          <p className="mt-3 text-xl font-semibold text-ink">{progress}%</p>
        </div>
        <div className="surface-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">
            Lessons completed
          </p>
          <p className="mt-3 text-xl font-semibold text-ink">
            {completedModules}
          </p>
        </div>
      </div>

      <section className="mt-6 surface-panel p-6">
        <p className="eyebrow">Learning focus</p>
        <p className="mt-4 text-base text-[rgba(24,29,26,0.72)]">
          Build practical depth in frontend, JavaScript, responsive design, and
          modern product workflows. This profile keeps your primary learning
          goal visible and your path focused.
        </p>
      </section>
    </div>
  );
}
