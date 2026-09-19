import { db } from "@/lib/db";

export interface NotificationItem {
  id: string;
  title: string;
  body: string | null;
  link: string;
  read: boolean;
  createdAt: Date;
}

export async function getNotificationsForUser(userId: string): Promise<{
  items: NotificationItem[];
  unreadCount: number;
}> {
  const items = await db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20, // recent notifications only — this is a bell dropdown, not an inbox
  });

  const unreadCount = await db.notification.count({ where: { userId, read: false } });

  return { items, unreadCount };
}
