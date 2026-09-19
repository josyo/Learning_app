import { requireRole } from "@/lib/session";
import { AppShell } from "@/components/app-shell";

export default async function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole(["LEARNER"]);

  return (
    <AppShell
      role="learner"
      userId={session.user.id}
      userName={session.user.name}
    >
      {children}
    </AppShell>
  );
}
