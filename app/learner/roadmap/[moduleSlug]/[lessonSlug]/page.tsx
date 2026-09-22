import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getModuleDetailForUser } from "@/modules/learning/get-module-detail";
import { MarkCompleteButton } from "@/components/mark-complete-button";

const markdownComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h2 {...props} className="mt-8 text-xl font-semibold text-ink first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h3 {...props} className="mt-8 text-lg font-semibold text-ink first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h4 {...props} className="mt-6 text-base font-semibold text-ink">
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mt-4 text-[15px] leading-7 text-slate-700">
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-slate-700"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-slate-700"
    >
      {children}
    </ol>
  ),
  blockquote: ({
    children,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-5 border-l-4 border-amber-300 bg-amber-50 px-4 py-3 text-[15px] leading-7 text-amber-900"
    >
      {children}
    </blockquote>
  ),
  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    const isInline = !className;
    return isInline ? (
      <code
        {...props}
        className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
      >
        {children}
      </code>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-100"
    >
      {children}
    </pre>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      href={href}
      className="font-medium text-indigo-700 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-900"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>;
}) {
  const { moduleSlug, lessonSlug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  // Reuses the module unlock check so a learner can't reach a
  // lesson's content by guessing its URL if the module is Locked.
  const moduleDetail = await getModuleDetailForUser(
    session.user.id,
    moduleSlug,
  );
  if (!moduleDetail || !moduleDetail.unlocked) notFound();

  const lessonSummary = moduleDetail.lessons.find((l) => l.slug === lessonSlug);
  if (!lessonSummary) notFound();

  const lesson = await db.lesson.findUnique({
    where: { moduleId_slug: { moduleId: moduleDetail.id, slug: lessonSlug } },
    include: { resources: true },
  });
  if (!lesson) notFound();

  const currentIndex = moduleDetail.lessons.findIndex(
    (l) => l.slug === lessonSlug,
  );
  const nextLesson = moduleDetail.lessons[currentIndex + 1];

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Link
          href={`/learner/roadmap/${moduleSlug}`}
          className="text-xs text-muted-foreground hover:underline"
        >
          ← Back to module
        </Link>
        <h1 className="text-xl font-semibold">{lesson.title}</h1>
      </div>

      {lesson.videoUrl && (
        <div className="aspect-video overflow-hidden rounded-lg border border-border">
          <iframe
            src={lesson.videoUrl}
            className="h-full w-full"
            allowFullScreen
            title={lesson.title}
          />
        </div>
      )}

      <article className="w-full max-w-none">
        <ReactMarkdown components={markdownComponents}>
          {lesson.content}
        </ReactMarkdown>
      </article>

      {lesson.resources.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Resources</h2>
          <ul className="flex flex-col gap-1">
            {lesson.resources.map((r) => (
              <li key={r.id}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border pt-4">
        <MarkCompleteButton
          lessonId={lesson.id}
          completed={lessonSummary.completed}
        />
        {nextLesson && (
          <Link
            href={`/learner/roadmap/${moduleSlug}/${nextLesson.slug}`}
            className="text-sm text-primary hover:underline"
          >
            Next lesson →
          </Link>
        )}
      </div>
    </div>
  );
}
