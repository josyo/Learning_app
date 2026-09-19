import { db } from "@/lib/db";
import { computeModuleStatuses } from "@/modules/progress/compute-module-statuses";
import { deriveLearnerModuleState, toModuleNode, type RawModuleState } from "@/modules/learning/derive-module-state";
import type { ModuleStatus } from "@/modules/progress/compute-module-statuses";

export interface EnrolledLesson {
  id: string;
  slug: string;
  title: string;
  required: boolean;
  completed: boolean;
}

export interface EnrolledSubmission {
  id: string;
  status: "SUBMITTED" | "APPROVED" | "CHANGES_REQUESTED";
  content: string | null;
  githubUrl: string | null;
  deployedUrl: string | null;
  attachmentUrl: string | null;
  createdAt: Date;
  latestReviewFeedback: string | null;
}

export interface EnrolledAssignment {
  id: string;
  slug: string;
  title: string;
  instructions: string;
  submissions: EnrolledSubmission[]; // newest first
}

export interface EnrolledModule {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  status: ModuleStatus;
  lessons: EnrolledLesson[];
  assignment: EnrolledAssignment | null;
  override: { action: "MARK_COMPLETE" | "UNLOCK"; note: string | null } | null;
}

export interface EnrolledPathState {
  enrollmentId: string;
  pathName: string;
  pathSlug: string;
  modules: EnrolledModule[];
}

export async function getEnrolledPathState(userId: string): Promise<EnrolledPathState | null> {
  const enrollment = await db.enrollment.findFirst({
    where: { userId, status: "ACTIVE" },
    include: {
      path: {
        include: {
          pathModules: {
            orderBy: { order: "asc" },
            include: {
              module: {
                include: {
                  requiresModules: true,
                  lessons: {
                    orderBy: { order: "asc" },
                    include: { progress: { where: { userId } } },
                  },
                  assignments: {
                    include: {
                      submissions: {
                        where: { userId },
                        orderBy: { createdAt: "desc" },
                        include: {
                          reviews: { orderBy: { createdAt: "desc" }, take: 1 },
                        },
                      },
                    },
                  },
                  overrides: { where: { userId } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!enrollment) return null;

  // Draft is "not visible to learners" — treated the same as having
  // no active enrollment at all. This governs both getEnrolledPathState
  // callers used by learners AND by mentors (getMentorDashboardData
  // calls this too) — "published" gates every non-admin role, not
  // just the learner-facing pages. Admin pages query Prisma directly
  // and are unaffected.
  if (!enrollment.path.published) return null;

  const rawStates: RawModuleState[] = enrollment.path.pathModules.map((pm) => {
    const assignment = pm.module.assignments[0]; // one assignment per module for MVP
    const latestSubmission = assignment?.submissions[0] ?? null;

    return {
      moduleId: pm.module.id,
      requiredModuleIds: pm.module.requiresModules.map((r) => r.requiredModuleId),
      requiredLessonCompletions: pm.module.lessons
        .filter((l) => l.required)
        .map((l) => l.progress.some((p) => p.completed)),
      hasAssignment: Boolean(assignment),
      latestSubmissionStatus: latestSubmission?.status ?? null,
      override: pm.module.overrides[0]?.action ?? null,
    };
  });

  const learnerState = new Map(
    rawStates.map((raw) => [raw.moduleId, deriveLearnerModuleState(raw)])
  );
  const nodes = rawStates.map(toModuleNode);
  const statuses = computeModuleStatuses(nodes, learnerState);

  // The status computation above deliberately runs over EVERY module
  // in the path, published or not — a draft module can still be a
  // real prerequisite for a published one, and computeModuleStatuses
  // needs the complete graph to get that right. Filtering happens
  // only here, on the output: a draft module simply never appears in
  // the learner's list. If something published depends on it, that
  // dependent correctly stays Locked, since the learner has no way
  // to complete a module they can't see.
  const modules: EnrolledModule[] = enrollment.path.pathModules
    .filter((pm) => pm.module.published)
    .map((pm) => {
    const assignment = pm.module.assignments[0];

    return {
      id: pm.module.id,
      slug: pm.module.slug,
      title: pm.module.title,
      description: pm.module.description,
      order: pm.order,
      status: statuses.get(pm.module.id) ?? "LOCKED",
      lessons: pm.module.lessons.map((l) => ({
        id: l.id,
        slug: l.slug,
        title: l.title,
        required: l.required,
        completed: l.progress.some((p) => p.completed),
      })),
      assignment: assignment
        ? {
            id: assignment.id,
            slug: assignment.slug,
            title: assignment.title,
            instructions: assignment.instructions,
            submissions: assignment.submissions.map((s) => ({
              id: s.id,
              status: s.status,
              content: s.content,
              githubUrl: s.githubUrl,
              deployedUrl: s.deployedUrl,
              attachmentUrl: s.attachmentUrl,
              createdAt: s.createdAt,
              latestReviewFeedback: s.reviews[0]?.feedback ?? null,
            })),
          }
        : null,
      override: pm.module.overrides[0]
        ? { action: pm.module.overrides[0].action, note: pm.module.overrides[0].note }
        : null,
    };
  });

  return {
    enrollmentId: enrollment.id,
    pathName: enrollment.path.name,
    pathSlug: enrollment.path.slug,
    modules,
  };
}