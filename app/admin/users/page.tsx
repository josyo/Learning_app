import { getAdminUsers, getMentorCandidates, getAllPathOptions } from "@/modules/admin/get-admin-users";
import { CreateUserForm } from "@/components/create-user-form";
import { UserRowControls } from "@/components/user-row-controls";

export default async function AdminUsersPage() {
  const [users, mentorCandidates, pathOptions] = await Promise.all([
    getAdminUsers(),
    getMentorCandidates(),
    getAllPathOptions(),
  ]);

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage roles, mentor assignment, and path enrollment.
        </p>
      </div>

      <CreateUserForm />

      <ol className="flex flex-col gap-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex flex-col gap-3 rounded-lg border border-border px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium">{u.name}</p>
              <p className="text-xs text-muted-foreground">
                {u.email}
                {u.activeEnrollment && ` · ${u.activeEnrollment.pathName}`}
              </p>
            </div>
            <UserRowControls
              userId={u.id}
              role={u.role}
              mentorId={u.mentorId}
              activeEnrollmentPathId={u.activeEnrollment?.pathId ?? null}
              mentorCandidates={mentorCandidates.filter((m) => m.id !== u.id)}
              pathOptions={pathOptions}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
