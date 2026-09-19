"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/modules/admin/user-actions";

export function CreateUserForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"LEARNER" | "MENTOR" | "ADMIN">("LEARNER");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await createUser(name, email, password, role);
        setName("");
        setEmail("");
        setPassword("");
        setRole("LEARNER");
        setOpen(false);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't create user.");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        + Invite user
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="new-user-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="new-user-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="new-user-role" className="text-sm font-medium">
            Role
          </label>
          <select
            id="new-user-role"
            value={role}
            onChange={(e) => setRole(e.target.value as "LEARNER" | "MENTOR" | "ADMIN")}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="LEARNER">Learner</option>
            <option value="MENTOR">Mentor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-user-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="new-user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-user-password" className="text-sm font-medium">
          Temporary password <span className="text-muted-foreground">(min 8 characters)</span>
        </label>
        <input
          id="new-user-password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Creating…" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
