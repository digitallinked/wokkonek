import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";
import { AcceptBidButton } from "./_components/accept-bid-button";
import { ConfirmCompletionButton } from "./_components/confirm-completion-button";
import Link from "next/link";

export default async function ClientJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await requireRole("client");
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "*, category:categories(name, icon), province:provinces(name), district:districts(name), assigned_tasker:profiles!jobs_assigned_tasker_id_fkey(display_name, phone)"
    )
    .eq("id", id)
    .eq("client_id", user.id)
    .single();

  if (!job) notFound();

  // Get progress updates
  const { data: updates } = await supabase
    .from("job_updates")
    .select("*, author:profiles!job_updates_author_id_fkey(display_name)")
    .eq("job_id", id)
    .order("created_at", { ascending: false });

  const { data: bids } = await supabase
    .from("bids")
    .select("*, tasker:profiles!bids_tasker_id_fkey(display_name)")
    .eq("job_id", id)
    .order("created_at", { ascending: false });

  const commission = Number(job.fixed_price) * (Number(job.commission_percent) / 100);
  const totalWithCommission = Number(job.fixed_price) + commission;

  return (
    <div>
      <Link
        href="/client/jobs"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        &larr; Back to My Jobs
      </Link>

      <div className="mt-4 rounded-lg border border-border bg-bg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">{job.title}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {(job.category as unknown as { icon?: string; name: string } | null)?.icon}{" "}
              {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
              {(job.province as unknown as { name: string } | null)?.name}
              {(job.district as unknown as { name: string } | null)?.name &&
                ` / ${(job.district as unknown as { name: string }).name}`}
            </p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>

        <p className="mt-4 text-text whitespace-pre-wrap">{job.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-md bg-surface p-3">
            <p className="text-xs text-text-muted">
              {job.assigned_tasker ? "Agreed Price" : "Budget"}
            </p>
            <p className="text-lg font-bold text-text">
              K{Number(job.fixed_price).toLocaleString()}
            </p>
          </div>
          <div className="rounded-md bg-surface p-3">
            <p className="text-xs text-text-muted">Commission (25%)</p>
            <p className="text-lg font-bold text-warning">
              K{commission.toLocaleString()}
            </p>
          </div>
          <div className="rounded-md bg-surface p-3">
            <p className="text-xs text-text-muted">Total Payment</p>
            <p className="text-lg font-bold text-primary">
              K{totalWithCommission.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Payment instructions for payment_pending or payment_rejected */}
        {(job.status === "payment_pending" || job.status === "payment_rejected") && (
          <div className="mt-6 rounded-lg border-2 border-warning bg-warning-light p-4">
            <h3 className="font-semibold text-text">
              {job.status === "payment_rejected"
                ? "Payment Rejected – Please Re-upload Receipt"
                : "BSP Bank Transfer Required"}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {job.status === "payment_rejected"
                ? "Your previous receipt was rejected. Please transfer "
                : "Please transfer "}
              <strong className="text-text">
                K{totalWithCommission.toLocaleString()}
              </strong>
              {" "}
              to the Wok Konek BSP account.
              {job.status === "payment_rejected"
                ? " Then upload your new receipt."
                : " Once transferred, upload your receipt below for admin verification."}
            </p>
            <Link
              href={`/client/jobs/${job.id}/payment`}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              {job.status === "payment_rejected"
                ? "Re-upload Payment Receipt"
                : "Upload Payment Receipt"}
            </Link>
          </div>
        )}

        {/* Assigned tasker info */}
        {job.assigned_tasker && (
          <div className="mt-6 rounded-md bg-secondary-light p-4">
            <p className="text-sm font-medium text-secondary">
              Assigned Tasker
            </p>
            <p className="text-text font-semibold">
              {(job.assigned_tasker as unknown as { display_name: string })?.display_name}
            </p>
          </div>
        )}

        {/* Tasker completed — client confirmation */}
        {job.status === "tasker_completed" && (
          <div className="mt-6 rounded-lg border-2 border-success bg-success-light p-4">
            <h3 className="font-semibold text-text">
              Tasker has completed the work
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Please review the work and confirm completion to close this job.
            </p>
            <div className="mt-3">
              <ConfirmCompletionButton jobId={job.id} />
            </div>
          </div>
        )}

        {job.status === "client_confirmed" && (
          <div className="mt-6 rounded-md bg-success-light p-4">
            <p className="text-sm font-medium text-success">
              This job is completed and confirmed.
            </p>
          </div>
        )}
      </div>

      {/* Progress updates */}
      {updates && updates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text">Progress Updates</h2>
          <div className="mt-4 space-y-3">
            {updates.map((update) => (
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
            ))}
          </div>
        </div>
      )}

      {/* Bids section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">
          Bids ({bids?.length ?? 0})
        </h2>

        <div className="mt-4 space-y-3">
          {!bids || bids.length === 0 ? (
            <div className="rounded-lg border border-border bg-bg p-6 text-center">
              <p className="text-text-secondary">
                No bids yet. Taskers will start bidding once they see your job.
              </p>
            </div>
          ) : (
            bids.map((bid) => (
              <div
                key={bid.id}
                className="rounded-lg border border-border bg-bg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">
                      {(bid.tasker as unknown as { display_name: string })?.display_name}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {bid.message}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-text">
                      K{Number(bid.amount).toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        bid.status === "accepted"
                          ? "bg-success-light text-success"
                          : bid.status === "rejected"
                          ? "bg-danger-light text-danger"
                          : bid.status === "withdrawn"
                          ? "bg-surface text-text-muted"
                          : "bg-accent-light text-accent"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </div>
                </div>

                {job.status === "open" && bid.status === "submitted" && (
                  <div className="mt-3">
                    <AcceptBidButton jobId={job.id} bidId={bid.id} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
