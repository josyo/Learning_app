"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/modules/admin/require-admin";

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: "LEARNER" | "MENTOR" | "ADMIN"
) {
  await requireAdmin();

  if (!name.trim() || !email.trim()) throw new Error("Name and email are both required");
  if (password.length < 8) throw new Error("Password must be at least 8 characters");

  const created = await auth.api.createUser({
    body: {
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    },
  });

  await db.user.update({ where: { id: created.user.id }, data: { role } });

  revalidatePath("/admin/users");
  return created.user.id;
}

export async function setUserRole(userId: string, role: "LEARNER" | "MENTOR" | "ADMIN") {
  await requireAdmin();

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Not found");

  // Refuse to demote the last admin — there's no other way back into
  // the admin panel if that happens, short of editing the database
  // directly.
  if (user.role === "ADMIN" && role !== "ADMIN") {
    const adminCount = await db.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      throw new Error("Can't change this — they're the only admin account.");
    }
  }

  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}

export async function setUserMentor(learnerId: string, mentorId: string | null) {
  await requireAdmin();

  if (mentorId) {
    const mentor = await db.user.findUnique({ where: { id: mentorId } });
    if (!mentor || (mentor.role !== "MENTOR" && mentor.role !== "ADMIN")) {
      throw new Error("Chosen mentor must have the Mentor or Admin role");
    }
  }

  await db.user.update({ where: { id: learnerId }, data: { mentorId } });

  revalidatePath("/admin/users");
  revalidatePath("/mentor/dashboard");
}

/**
 * Enrolls a user in a path. Every learner-facing query
 * (getEnrolledPathState and everything built on it) assumes exactly
 * one ACTIVE enrollment at a time, even though the schema itself
 * allows several — so if the user already has a different active
 * enrollment, it's paused first rather than left ambiguous.
 */
export async function enrollUserInPath(userId: string, pathId: string) {
  await requireAdmin();

  const existingActive = await db.enrollment.findFirst({
    where: { userId, status: "ACTIVE" },
  });

  if (existingActive && existingActive.pathId !== pathId) {
    await db.enrollment.update({
      where: { id: existingActive.id },
      data: { status: "PAUSED" },
    });
  }

  await db.enrollment.upsert({
    where: { userId_pathId: { userId, pathId } },
    update: { status: "ACTIVE" },
    create: { userId, pathId, status: "ACTIVE" },
  });

  revalidatePath("/admin/users");
  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
}
