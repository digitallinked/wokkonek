import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { BidForm } from "./_components/bid-form";

export default async function TaskerJobDetailPage({
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
      "*, category:categories(name, icon), province:provinces(name), district:districts(name)"
    )
    .eq("id", id)
    .eq("status", "open")
    .single();

  if (!job) notFound();

  // Check if the tasker already bid on this job
  const { data: existingBid } = await supabase
    .from("bids")
    .select("id, amount, message, status")
    .eq("job_id", id)
    .eq("tasker_id", user.id)
    .single();

  // Count existing bids
  const { count: bidCount } = await supabase
    .from("bids")
    .select("*", { count: "exact", head: true })
    .eq("job_id", id);

  return (
    <div>
      <Link
        href="/tasker/jobs"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        &larr; Back to Browse Jobs
      </Link>

      <div className="mt-4 rounded-lg border border-border bg-bg p-6">
        <h1 className="text-2xl font-bold text-text">{job.title}</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {(job.category as unknown as { icon?: string; name: string } | null)?.icon}{" "}
          {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
          {(job.province as unknown as { name: string } | null)?.name}
          {(job.district as unknown as { name: string } | null)?.name &&
            ` / ${(job.district as unknown as { name: string }).name}`}
        </p>

        <p className="mt-4 text-text whitespace-pre-wrap">{job.description}</p>

        <div className="mt-6 flex items-center gap-6">
          <div>
            <p className="text-xs text-text-muted">Budget</p>
            <p className="text-xl font-bold text-text">
              K{Number(job.fixed_price).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-muted">Bids</p>
            <p className="text-xl font-bold text-text">{bidCount ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Bid section */}
      <div className="mt-8 max-w-lg">
        {existingBid ? (
          <div className="rounded-lg border border-border bg-bg p-6">
            <h2 className="text-lg font-semibold text-text">Your Bid</h2>
            <div className="mt-3">
              <p className="text-lg font-bold text-text">
                K{Number(existingBid.amount).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                {existingBid.message}
              </p>
              <span
                className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  existingBid.status === "accepted"
                    ? "bg-success-light text-success"
                    : existingBid.status === "rejected"
                    ? "bg-danger-light text-danger"
                    : "bg-accent-light text-accent"
                }`}
              >
                {existingBid.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-bg p-6">
            <h2 className="text-lg font-semibold text-text">Place Your Bid</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Tell the client how much you&apos;d charge and why you&apos;re the right
              person for the job.
            </p>
            <div className="mt-4">
              <BidForm jobId={job.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
