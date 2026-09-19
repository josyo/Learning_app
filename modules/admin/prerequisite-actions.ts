"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/modules/admin/require-admin";

/**
 * True if `startId` can reach `targetId` by following requiredModuleId
 * edges (i.e. startId already depends on targetId, directly or
 * transitively). Used to reject an edge that would create a cycle —
 * compute-module-statuses assumes prerequisites form a DAG, and a
 * cycle would permanently deadlock every module in it against every
 * other, with no way for a learner to ever unlock any of them.
 */
async function dependsOn(startId: string, targetId: string): Promise<boolean> {
  const visited = new Set<string>();
  let frontier = [startId];

  while (frontier.length > 0) {
    const rows = await db.modulePrerequisite.findMany({
      where: { moduleId: { in: frontier } },
      select: { requiredModuleId: true },
    });
    const next: string[] = [];
    for (const row of rows) {
      if (row.requiredModuleId === targetId) return true;
      if (!visited.has(row.requiredModuleId)) {
        visited.add(row.requiredModuleId);
        next.push(row.requiredModuleId);
      }
    }
    frontier = next;
  }

  return false;
}

export async function addPrerequisite(moduleId: string, requiredModuleId: string) {
  await requireAdmin();

  if (moduleId === requiredModuleId) {
    throw new Error("A module can't require itself");
  }

  // Would adding "moduleId requires requiredModuleId" create a cycle?
  // That happens exactly when requiredModuleId already (transitively)
  // requires moduleId — adding the edge the other way would close the loop.
  if (await dependsOn(requiredModuleId, moduleId)) {
    throw new Error(
      "That would create a circular dependency — the required module already depends on this one."
    );
  }

  await db.modulePrerequisite.upsert({
    where: { moduleId_requiredModuleId: { moduleId, requiredModuleId } },
    update: {},
    create: { moduleId, requiredModuleId },
  });

  revalidatePath(`/admin/modules/${moduleId}`);
  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
}

export async function removePrerequisite(moduleId: string, requiredModuleId: string) {
  await requireAdmin();

  await db.modulePrerequisite.deleteMany({ where: { moduleId, requiredModuleId } });

  revalidatePath(`/admin/modules/${moduleId}`);
  revalidatePath("/learner/roadmap");
  revalidatePath("/learner/dashboard");
}
