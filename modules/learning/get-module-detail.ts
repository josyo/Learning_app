import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";
import type { EnrolledAssignment, EnrolledLesson } from "@/modules/learning/get-enrolled-path-state";

export interface ModuleDetail {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  unlocked: boolean;
  lessons: EnrolledLesson[];
  assignment: EnrolledAssignment | null;
}

/**
 * Scoped to one module, for the module detail and lesson pages.
 * Both call this and 404 if `unlocked` is false, so a learner can't
 * reach a locked module's lessons or assignment by guessing the URL.
 */
export async function getModuleDetailForUser(
  userId: string,
  moduleSlug: string
): Promise<ModuleDetail | null> {
  const state = await getEnrolledPathState(userId);
  if (!state) return null;

  const module = state.modules.find((m) => m.slug === moduleSlug);
  if (!module) return null;

  return {
    id: module.id,
    slug: module.slug,
    title: module.title,
    description: module.description,
    unlocked: module.status !== "LOCKED",
    lessons: module.lessons,
    assignment: module.assignment,
  };
}
