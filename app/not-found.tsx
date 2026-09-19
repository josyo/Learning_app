import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-3 px-6 py-24">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        Either this link is wrong, or whatever it pointed to has been moved or removed.
      </p>
      <Link href="/" className="text-sm text-primary hover:underline">
        Go to the homepage
      </Link>
    </div>
  );
}
