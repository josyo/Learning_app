import { db } from "@/lib/db";

export interface AdminAssignmentDetail {
  id: string;
  title: string;
  instructions: string;
  submissionCount: number;
}

/** One assignment per module for MVP — same assumption get-enrolled-path-state.ts makes. */
export async function getAdminAssignmentForModule(
  moduleId: string
): Promise<AdminAssignmentDetail | null> {
  const assignment = await db.assignment.findFirst({
    where: { moduleId },
    include: { _count: { select: { submissions: true } } },
  });

  if (!assignment) return null;

  return {
    id: assignment.id,
    title: assignment.title,
    instructions: assignment.instructions,
    submissionCount: assignment._count.submissions,
  };
}
