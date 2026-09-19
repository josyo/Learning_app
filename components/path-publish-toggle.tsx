"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setPathPublished } from "@/modules/admin/path-actions";

export function PathPublishToggle({
  pathId,
  published,
}: {
  pathId: string;
  published: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await setPathPublished(pathId, !published);
          router.refresh();
        })
      }
      disabled={isPending}
      className={`rounded-full px-2.5 py-1 text-xs font-medium disabled:opacity-50 ${
        published ? "bg-green-50 text-green-700" : "bg-muted text-muted-foreground"
      }`}
    >
      {isPending ? "…" : published ? "Published" : "Draft"}
    </button>
  );
}
