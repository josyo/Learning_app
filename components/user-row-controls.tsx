"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserRole, setUserMentor, enrollUserInPath } from "@/modules/admin/user-actions";
import type { MentorCandidate, PathOption } from "@/modules/admin/get-admin-users";

export function UserRowControls({
  userId,
  role,
  mentorId,
  activeEnrollmentPathId,
  mentorCandidates,
  pathOptions,
}: {
  userId: string;
  role: "LEARNER" | "MENTOR" | "ADMIN";
  mentorId: string | null;
  activeEnrollmentPathId: string | null;
  mentorCandidates: MentorCandidate[];
  pathOptions: PathOption[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't update.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={role}
          onChange={(e) =>
            run(() => setUserRole(userId, e.target.value as "LEARNER" | "MENTOR" | "ADMIN"))
          }
          disabled={isPending}
          className="rounded-md border border-border bg-background px-2 py-1 text-xs disabled:opacity-50"
        >
          <option value="LEARNER">Learner</option>
          <option value="MENTOR">Mentor</option>
          <option value="ADMIN">Admin</option>
        </select>

        {role === "LEARNER" && (
          <select
            value={mentorId ?? ""}
            onChange={(e) => run(() => setUserMentor(userId, e.target.value || null))}
            disabled={isPending}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs disabled:opacity-50"
          >
            <option value="">No mentor</option>
            {mentorCandidates.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        )}

        {role === "LEARNER" && (
          <select
            value={activeEnrollmentPathId ?? ""}
            onChange={(e) => {
              if (e.target.value) run(() => enrollUserInPath(userId, e.target.value));
            }}
            disabled={isPending}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs disabled:opacity-50"
          >
            <option value="">Not enrolled</option>
            {pathOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {!p.published && "(draft)"}
              </option>
            ))}
          </select>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
