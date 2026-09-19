import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export default async function LearnerProgressPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const state = await getEnrolledPathState(session.user.id);
  if (!state) {
    return (
      <div className="max-w-[60ch]">
        <h1 className="text-lg font-medium">No active learning path yet</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You&apos;re not enrolled in a path yet, so there&apos;s no progress
          summary to show.
        </p>
      </div>
    );
  }

  const totalModules = state.modules.length;
  const completedModules = state.modules.filter(
    (m) => m.status === "COMPLETED",
  ).length;
  const percent =
    totalModules === 0
      ? 0
      : Math.round((completedModules / totalModules) * 100);
  const coveredModules = state.modules.filter((m) => m.status === "COMPLETED");

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Progress</p>
        <h1 className="text-2xl font-semibold">{state.pathName}</h1>
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
          <div>
            <p className="text-sm text-muted-foreground">Overall progress</p>
            <p className="mt-1 text-2xl font-semibold">{percent}%</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>
              {completedModules}/{totalModules} modules complete
            </div>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Completed modules</h2>
        {coveredModules.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
            No modules are complete yet. Finish your next lesson or submit the
            current assignment to start moving forward.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {coveredModules.map((module) => (
              <li
                key={module.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/learner/roadmap/${module.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {module.title}
                  </Link>
                  <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-green-700">
                    Completed
                  </span>
                </div>
                {module.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {module.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
