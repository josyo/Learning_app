"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin, slugify } from "@/modules/admin/require-admin";

async function revalidateModuleAndLearnerPaths(moduleId: string) {
  revalidatePath(`/admin/modules/${moduleId}`);
  const module = await db.module.findUnique({ where: { id: moduleId }, select: { slug: true } });
  if (module) revalidatePath(`/learner/roadmap/${module.slug}`);
  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
}

export async function createAssignment(moduleId: string, title: string, instructions: string) {
  await requireAdmin();

  if (!title.trim() || !instructions.trim()) {
    throw new Error("Title and instructions are both required");
  }

  // get-enrolled-path-state.ts and the rest of the learner-facing
  // code treat a module as having at most one assignment
  // (assignments[0]). Enforcing that here rather than letting a
  // second one silently go unused.
  const existing = await db.assignment.findFirst({ where: { moduleId } });
  if (existing) {
    throw new Error("This module already has an assignment — edit it instead of creating another.");
  }

  const baseSlug = slugify(title);
  if (!baseSlug) throw new Error("Title must contain at least one letter or number");
  let slug = baseSlug;
  let suffix = 2;
  while (await db.assignment.findUnique({ where: { moduleId_slug: { moduleId, slug } } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  await db.assignment.create({
    data: { moduleId, slug, title: title.trim(), instructions: instructions.trim(), order: 0 },
  });

  await revalidateModuleAndLearnerPaths(moduleId);
}

export async function updateAssignment(
  assignmentId: string,
  data: { title: string; instructions: string }
) {
  await requireAdmin();
  if (!data.title.trim() || !data.instructions.trim()) {
    throw new Error("Title and instructions are both required");
  }

  const assignment = await db.assignment.update({
    where: { id: assignmentId },
    data: { title: data.title.trim(), instructions: data.instructions.trim() },
  });

  await revalidateModuleAndLearnerPaths(assignment.moduleId);
}

export async function deleteAssignment(assignmentId: string) {
  await requireAdmin();

  const assignment = await db.assignment.findUnique({
    where: { id: assignmentId },
    include: { _count: { select: { submissions: true } } },
  });
  if (!assignment) throw new Error("Not found");

  // Assignment -> Submission -> SubmissionReview all cascade-delete.
  // Refuse if any learner has ever submitted to it, same principle
  // as every other delete guard in this phase.
  if (assignment._count.submissions > 0) {
    throw new Error(
      `Can't delete — ${assignment._count.submissions} submission(s) exist for this assignment.`
    );
  }

  await db.assignment.delete({ where: { id: assignmentId } });
  await revalidateModuleAndLearnerPaths(assignment.moduleId);
}
