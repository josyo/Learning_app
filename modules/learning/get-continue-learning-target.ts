import { getEnrolledPathState } from "@/modules/learning/get-enrolled-path-state";

export type ContinueLearningTarget =
  | {
      type: "lesson";
      moduleSlug: string;
      moduleTitle: string;
      lessonSlug: string;
      lessonTitle: string;
    }
  | {
      type: "assignment";
      moduleSlug: string;
      moduleTitle: string;
      assignmentTitle: string;
      isResubmit: boolean;
    }
  | { type: "awaiting_review"; moduleTitle: string }
  | { type: "all_done" };

export interface ContinueLearningResult {
  target: ContinueLearningTarget | null;
  overallProgress: { completedRequiredModules: number; totalRequiredModules: number };
}

/**
 * Walks the path in order and returns the next actionable thing:
 * an incomplete required lesson, an assignment that needs a first
 * submission or a resubmit, or a signal that the learner is simply
 * waiting on a mentor review. Only looks at unlocked modules, so it
 * never points the learner at something they can't act on yet.
 */
export async function getContinueLearningTarget(
  userId: string
): Promise<ContinueLearningResult | null> {
  const state = await getEnrolledPathState(userId);
  if (!state) return null;

  const totalRequiredModules = state.modules.length;
  const completedRequiredModules = state.modules.filter((m) => m.status === "COMPLETED").length;

  for (const module of state.modules) {
    if (module.status === "LOCKED") continue;
    if (module.status === "COMPLETED") continue;

    const nextLesson = module.lessons.find((l) => l.required && !l.completed);
    if (nextLesson) {
      return {
        target: {
          type: "lesson",
          moduleSlug: module.slug,
          moduleTitle: module.title,
          lessonSlug: nextLesson.slug,
          lessonTitle: nextLesson.title,
        },
        overallProgress: { completedRequiredModules, totalRequiredModules },
      };
    }

    if (module.assignment) {
      const latest = module.assignment.submissions[0];
      if (!latest || latest.status === "CHANGES_REQUESTED") {
        return {
          target: {
            type: "assignment",
            moduleSlug: module.slug,
            moduleTitle: module.title,
            assignmentTitle: module.assignment.title,
            isResubmit: Boolean(latest),
          },
          overallProgress: { completedRequiredModules, totalRequiredModules },
        };
      }
      if (latest.status === "SUBMITTED") {
        return {
          target: { type: "awaiting_review", moduleTitle: module.title },
          overallProgress: { completedRequiredModules, totalRequiredModules },
        };
      }
    }
  }

  return {
    target: { type: "all_done" },
    overallProgress: { completedRequiredModules, totalRequiredModules },
  };
}
