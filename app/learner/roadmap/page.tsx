import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getRoadmapForUser } from "@/modules/learning/get-roadmap";
import { RoadmapTrail } from "@/components/learner/roadmap-trail";

export default async function RoadmapPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const roadmap = await getRoadmapForUser(session.user.id);

  if (!roadmap) {
    return (
      <div className="learner-copy">
        <h1 className="text-3xl">No active learning path yet</h1>
        <p className="mt-3 text-base text-[rgba(34,38,31,0.72)]">
          You&apos;re not enrolled in a path yet — ask an admin to enroll you
          and your roadmap will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="learner-copy">
      <header className="mb-8">
        <p className="font-mono text-sm text-[rgba(34,38,31,0.72)]">
          Learning path
        </p>
        <h1 className="mt-2 text-4xl text-ink">{roadmap.pathName}</h1>
        <p className="mt-2 text-base text-[rgba(34,38,31,0.72)]">
          {roadmap.modules.length} modules in sequence.
        </p>
      </header>

      <RoadmapTrail modules={roadmap.modules} />
    </div>
  );
}
