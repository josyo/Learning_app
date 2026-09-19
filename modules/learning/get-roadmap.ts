import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";
import type { ModuleStatus } from "@/modules/progress/compute-module-statuses";

export interface RoadmapModule {
  moduleId: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  status: ModuleStatus;
}

export interface Roadmap {
  pathName: string;
  pathSlug: string;
  modules: RoadmapModule[];
}

/**
 * Thin view over getEnrolledPathState for the roadmap page — just
 * the fields it needs to render the ordered list with status badges.
 */
export async function getRoadmapForUser(userId: string): Promise<Roadmap | null> {
  const state = await getEnrolledPathState(userId);
  if (!state) return null;

  return {
    pathName: state.pathName,
    pathSlug: state.pathSlug,
    modules: state.modules.map((m) => ({
      moduleId: m.id,
      slug: m.slug,
      title: m.title,
      description: m.description,
      order: m.order,
      status: m.status,
    })),
  };
}
