import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRoadmapForUser } from "@/modules/learning/get-roadmap";
import { RoadmapTrail } from "@/components/learner/roadmap-trail";

export default async function LearnerPathsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const roadmap = await getRoadmapForUser(session.user.id);

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Learning paths</p>
        <h1 className="mt-3 text-4xl text-ink">No active path yet</h1>
        <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
          You are not enrolled in a learning path yet. Once assigned, the full sequence of modules will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="eyebrow">Learning paths</p>
        <h1 className="mt-3 text-4xl tracking-tight text-ink">{roadmap.pathName}</h1>
        <p className="mt-3 max-w-2xl text-base text-[rgba(24,29,26,0.72)]">
          A structured sequence of modules designed to build practical skills in a deliberate order.
        </p>
      </header>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="surface-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Modules</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{roadmap.modules.length}</p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Progress</p>
          <p className="mt-3 text-3xl font-semibold text-ink">
            {Math.round((roadmap.modules.filter((module) => module.status === "COMPLETED").length / Math.max(roadmap.modules.length, 1)) * 100)}%
          </p>
        </div>
        <div className="surface-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(24,29,26,0.5)]">Next unlock</p>
          <p className="mt-3 text-base text-[rgba(24,29,26,0.72)]">
            {roadmap.modules.find((module) => module.status !== "LOCKED" && module.status !== "COMPLETED")?.title ?? "Completed"}
          </p>
        </div>
      </div>

      <section className="surface-panel p-6 md:p-8">
        <RoadmapTrail modules={roadmap.modules} />
      </section>

      <div className="mt-6 flex justify-end">
        <Link href="/learner/dashboard" className="secondary-button">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
