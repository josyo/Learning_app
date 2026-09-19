import { db } from "@/lib/db";
import type { NotificationType } from "@prisma/client";

export async function createNotification(
  userId: string,
  type: NotificationType,
  title: string,
  body: string | null,
  link: string
) {
  await db.notification.create({ data: { userId, type, title, body, link } });
}
