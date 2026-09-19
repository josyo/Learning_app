import { db } from "@/lib/db";

export interface MentorAssignmentItem {
  id: string;
  title: string;
  instructions: string;
  status: "ASSIGNED" | "SUBMITTED" | "APPROVED" | "CHANGES_REQUESTED";
  submissionContent: string | null;
  submissionGithubUrl: string | null;
  submissionDeployedUrl: string | null;
  feedback: string | null;
  mentorName: string;
  createdAt: Date;
}

export async function getMentorAssignmentsForUser(userId: string): Promise<MentorAssignmentItem[]> {
  const rows = await db.mentorAssignment.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { mentor: { select: { name: true } } },
  });

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    instructions: r.instructions,
    status: r.status,
    submissionContent: r.submissionContent,
    submissionGithubUrl: r.submissionGithubUrl,
    submissionDeployedUrl: r.submissionDeployedUrl,
    feedback: r.feedback,
    mentorName: r.mentor.name,
    createdAt: r.createdAt,
  }));
}
