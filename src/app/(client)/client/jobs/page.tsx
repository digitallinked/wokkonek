import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function ClientJobsPage() {
  const { user } = await requireRole("client");
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select(
      "id, title, fixed_price, status, created_at, category:categories(name), province:provinces(name)"
    )
    .eq("client_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">My Jobs</h1>
        <Link
          href="/client/jobs/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          Post a Job
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">
              No jobs yet.{" "}
              <Link
                href="/client/jobs/new"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Post your first job
              </Link>
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/client/jobs/${job.id}`}
              className="block rounded-lg border border-border bg-bg p-4 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text truncate">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
                    {(job.province as unknown as { name: string } | null)?.name}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-bold text-text">
                    K{Number(job.fixed_price).toLocaleString()}
                  </span>
                  <JobStatusBadge status={job.status} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
