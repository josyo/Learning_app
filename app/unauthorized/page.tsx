import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ROLE_HOME: Record<string, string> = {
  LEARNER: "/learner/dashboard",
  MENTOR: "/mentor/dashboard",
  ADMIN: "/admin/dashboard",
};

export default async function UnauthorizedPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  const home: string = role && ROLE_HOME[role] ? ROLE_HOME[role] : "/login";

  return (
    <main className="mx-auto flex max-w-md flex-col gap-3 px-6 py-24">
      <h1 className="text-xl font-semibold">
        You don&apos;t have access to this page
      </h1>
      <p className="text-sm text-muted-foreground">
        Your account role doesn&apos;t include this area. If that seems wrong,
        ask your mentor or admin to check your role assignment.
      </p>
      <Link href={home} className="text-sm text-primary hover:underline">
        {session ? "Back to your dashboard" : "Log in"}
      </Link>
    </main>
  );
}
