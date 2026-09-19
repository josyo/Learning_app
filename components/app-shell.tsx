import { getNotificationsForUser } from "@/modules/notifications/get-notifications";
import { AppShellClient } from "@/components/app-shell-client";

const NAV_ITEMS: Record<
  "learner" | "mentor" | "admin",
  { href: string; label: string }[]
> = {
  learner: [
    { href: "/learner/dashboard", label: "Dashboard" },
    { href: "/learner/my-learning", label: "My Learning" },
    { href: "/learner/roadmap", label: "Paths" },
    { href: "/learner/progress", label: "Progress" },
    { href: "/learner/extra", label: "Projects" },
  ],
  mentor: [{ href: "/mentor/dashboard", label: "Dashboard" }],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/paths", label: "Paths" },
    { href: "/admin/modules", label: "Modules" },
    { href: "/admin/users", label: "Users" },
  ],
};

/**
 * Server component: does the data fetching (notifications) that
 * needs to happen before render. All the interactive layout
 * (mobile drawer state) lives in AppShellClient — split out so this
 * file can stay async without dragging useState into a server
 * component.
 */
export async function AppShell({
  role,
  userId,
  userName,
  children,
}: {
  role: "learner" | "mentor" | "admin";
  userId: string;
  userName: string;
  children: React.ReactNode;
}) {
  const { items: notifications, unreadCount } =
    await getNotificationsForUser(userId);
  const navItems = NAV_ITEMS[role];

  return (
    <AppShellClient
      role={role}
      navItems={navItems}
      userName={userName}
      notifications={notifications}
      unreadCount={unreadCount}
    >
      {children}
    </AppShellClient>
  );
}
