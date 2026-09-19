import { getNotificationsForUser } from "@/modules/notifications/get-notifications";
import { LearnerShellClient } from "@/components/learner/learner-shell-client";

export async function LearnerShell({
  userId,
  userName,
  children,
}: {
  userId: string;
  userName: string;
  children: React.ReactNode;
}) {
  const { items: notifications, unreadCount } = await getNotificationsForUser(userId);

  return (
    <LearnerShellClient userName={userName} notifications={notifications} unreadCount={unreadCount}>
      {children}
    </LearnerShellClient>
  );
}
