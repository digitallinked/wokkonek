import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";
import { PostUpdateForm } from "./_components/post-update-form";
import { MarkCompletedButton } from "./_components/mark-completed-button";

export default async function TaskerAssignedJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await requireRole("tasker");
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "*, category:categories(name, icon), province:provinces(name), district:districts(name), client:profiles!jobs_client_id_fkey(display_name)"
    )
    .eq("id", id)
    .eq("assigned_tasker_id", user.id)
    .single();

  if (!job) notFound();

  const { data: updates } = await supabase
    .from("job_updates")
    .select("*, author:profiles!job_updates_author_id_fkey(display_name)")
    .eq("job_id", id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <Link
        href="/tasker/assigned"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        &larr; Back to Assigned Jobs
      </Link>

      <div className="mt-4 rounded-lg border border-border bg-bg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">{job.title}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {(job.category as unknown as { icon?: string; name: string } | null)?.icon}{" "}
              {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
              {(job.province as unknown as { name: string } | null)?.name}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Client: {(job.client as unknown as { display_name: string } | null)?.display_name}
            </p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>

        <p className="mt-4 text-text whitespace-pre-wrap">{job.description}</p>

        <div className="mt-4">
          <span className="text-lg font-bold text-text">
            K{Number(job.fixed_price).toLocaleString()}
          </span>
        </div>

        {/* Mark as completed button */}
        {job.status === "in_progress" && (
          <div className="mt-6">
            <MarkCompletedButton jobId={job.id} />
          </div>
        )}

        {job.status === "tasker_completed" && (
          <div className="mt-6 rounded-md bg-success-light p-4">
            <p className="text-sm font-medium text-success">
              You have marked this job as completed. Waiting for client confirmation.
            </p>
          </div>
        )}

        {job.status === "client_confirmed" && (
          <div className="mt-6 rounded-md bg-success-light p-4">
            <p className="text-sm font-medium text-success">
              This job is completed and confirmed by the client.
            </p>
          </div>
        )}
      </div>

      {/* Progress updates */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">Progress Updates</h2>

        {job.status === "in_progress" && (
          <div className="mt-4 rounded-lg border border-border bg-bg p-4">
            <PostUpdateForm jobId={job.id} />
          </div>
        )}

        <div className="mt-4 space-y-3">
          {!updates || updates.length === 0 ? (
            <p className="text-sm text-text-muted">No updates yet.</p>
          ) : (
            updates.map((update) => (
              <div
                key={update.id}
                className="rounded-lg border border-border bg-bg p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text">
                    {(update.author as unknown as { display_name: string })?.display_name}
                  </span>
                  <span className="text-xs text-text-muted">
                    {new Date(update.created_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  {update.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
