import { requireRole } from "@/lib/session";
import { AppShell } from "@/components/app-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole(["ADMIN"]);

  return (
    <AppShell role="admin" userId={session.user.id} userName={session.user.name}>
      {children}
    </AppShell>
  );
}
