import { headers } from "next/headers";
import ReactMarkdown from "react-markdown";
import { auth } from "@/lib/auth";
import { getMentorAssignmentsForUser } from "@/modules/learning/get-mentor-assignments";
import { MentorAssignmentSubmissionForm } from "@/components/mentor-assignment-submission-form";
import { EmptyState } from "@/components/empty-state";
import { Sparkles } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  ASSIGNED: "Not started",
  SUBMITTED: "Awaiting review",
  APPROVED: "Approved",
  CHANGES_REQUESTED: "Changes requested",
};

const STATUS_CLASS: Record<string, string> = {
  ASSIGNED: "bg-muted text-muted-foreground",
  SUBMITTED: "bg-violet-50 text-violet-700",
  APPROVED: "bg-green-50 text-green-700",
  CHANGES_REQUESTED: "bg-red-50 text-red-700",
};

export default async function ExtraExercisesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const items = await getMentorAssignmentsForUser(session.user.id);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Extra exercises</h1>
        <p className="text-sm text-muted-foreground">
          Supplementary exercises your mentor has assigned you outside the main roadmap.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Nothing assigned yet"
          description="Your mentor hasn't given you anything outside the main roadmap. Check back later."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const canSubmit = item.status === "ASSIGNED" || item.status === "CHANGES_REQUESTED";
            return (
              <div key={item.id} className="flex flex-col gap-3 rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASS[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">From {item.mentorName}</p>
                <article className="prose prose-sm max-w-none">
                  <ReactMarkdown>{item.instructions}</ReactMarkdown>
                </article>
                {item.feedback && (
                  <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                    Mentor feedback: {item.feedback}
                  </p>
                )}
                {canSubmit && <MentorAssignmentSubmissionForm id={item.id} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
