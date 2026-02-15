import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function AdminReleasePaymentPage() {
  await requireRole("admin");
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select(
      "id, title, fixed_price, status, created_at, assigned_tasker:profiles!jobs_assigned_tasker_id_fkey(id, display_name, phone), client:profiles!jobs_client_id_fkey(display_name)"
    )
    .eq("status", "client_confirmed")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Release Payment</h1>
      <p className="mt-1 text-text-secondary">
        Jobs completed and confirmed by clients. Pay the tasker via bank transfer
        (manual process).
      </p>

      <div className="mt-6 rounded-lg border border-border bg-bg p-4 mb-6">
        <p className="text-sm text-text-muted">
          <strong>Process:</strong> For each job below, transfer the agreed amount
          to the tasker&apos;s bank account. This is done outside the app. There is
          no in-app &quot;mark as paid&quot; in Phase 1.
        </p>
      </div>

      <div className="space-y-4">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">
              No jobs awaiting payment release. Completed jobs will appear here
              after the client confirms completion.
            </p>
          </div>
        ) : (
          jobs.map((job) => {
            const tasker = job.assigned_tasker as unknown as {
              id: string;
              display_name: string | null;
              phone: string | null;
            } | null;
            const client = job.client as unknown as {
              display_name: string | null;
            } | null;

            return (
              <div
                key={job.id}
                className="rounded-lg border-2 border-success/30 bg-bg p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-text text-lg">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      Client: {client?.display_name ?? "—"}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <JobStatusBadge status={job.status} />
                      <span className="text-xs text-text-muted">
                        Completed{" "}
                        {new Date(job.created_at).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface p-4 min-w-[200px]">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
                      Pay Tasker
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      K{Number(job.fixed_price).toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm font-medium text-text">
                      {tasker?.display_name ?? "—"}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {tasker?.phone ? (
                        <a
                          href={`tel:${tasker.phone}`}
                          className="hover:text-primary"
                        >
                          {tasker.phone}
                        </a>
                      ) : (
                        "No phone"
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex gap-3">
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    View job details &rarr;
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
