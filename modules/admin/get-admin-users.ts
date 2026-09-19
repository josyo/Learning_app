import { db } from "@/lib/db";

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "LEARNER" | "MENTOR" | "ADMIN";
  mentorId: string | null;
  mentorName: string | null;
  activeEnrollment: { pathId: string; pathName: string; published: boolean } | null;
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const users = await db.user.findMany({
    orderBy: { name: "asc" },
    include: {
      mentor: { select: { name: true } },
      enrollments: {
        where: { status: "ACTIVE" },
        include: { path: { select: { id: true, name: true, published: true } } },
      },
    },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    mentorId: u.mentorId,
    mentorName: u.mentor?.name ?? null,
    activeEnrollment: u.enrollments[0]
      ? {
          pathId: u.enrollments[0].path.id,
          pathName: u.enrollments[0].path.name,
          published: u.enrollments[0].path.published,
        }
      : null,
  }));
}

export interface MentorCandidate {
  id: string;
  name: string;
}

/** Anyone who can mentor — MENTOR or ADMIN role. */
export async function getMentorCandidates(): Promise<MentorCandidate[]> {
  const users = await db.user.findMany({
    where: { role: { in: ["MENTOR", "ADMIN"] } },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  return users;
}

export interface PathOption {
  id: string;
  name: string;
  published: boolean;
}

export async function getAllPathOptions(): Promise<PathOption[]> {
  const paths = await db.learningPath.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, published: true },
  });
  return paths;
}
