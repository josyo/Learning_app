import { requireRole } from "@/lib/session";
import { AppShell } from "@/components/app-shell";

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  return (
    <AppShell role="mentor" userId={session.user.id} userName={session.user.name}>
      {children}
    </AppShell>
  );
}
