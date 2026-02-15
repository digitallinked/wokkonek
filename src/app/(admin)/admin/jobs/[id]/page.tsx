import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobStatusBadge } from "@/components/job-status-badge";

export default async function AdminJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole("admin");
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "*, client:profiles!jobs_client_id_fkey(display_name, phone), assigned_tasker:profiles!jobs_assigned_tasker_id_fkey(display_name, phone), category:categories(name), province:provinces(name), district:districts(name)"
    )
    .eq("id", id)
    .single();

  if (!job) notFound();

  const client = job.client as unknown as {
    display_name: string | null;
    phone: string | null;
  } | null;
  const tasker = job.assigned_tasker as unknown as {
    display_name: string | null;
    phone: string | null;
  } | null;
  const category = job.category as unknown as { name: string } | null;
  const province = job.province as unknown as { name: string } | null;
  const district = job.district as unknown as { name: string } | null;

  return (
    <div>
      <Link
        href="/admin/jobs"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        &larr; Back to All Jobs
      </Link>

      <div className="mt-6 rounded-lg border border-border bg-bg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">{job.title}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              {category?.name} &middot; {province?.name}
              {district?.name && ` / ${district.name}`}
            </p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>

        <p className="mt-4 text-text whitespace-pre-wrap">{job.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="font-semibold text-text">
              Client
            </h3>
            <p className="mt-1 text-text">{client?.display_name ?? "—"}</p>
            <p className="text-sm text-text-secondary">
              {client?.phone ? (
                <a href={`tel:${client.phone}`} className="hover:text-primary">
                  {client.phone}
                </a>
              ) : (
                "No phone"
              )}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <h3 className="font-semibold text-text">
              Assigned Tasker
            </h3>
            <p className="mt-1 text-text">{tasker?.display_name ?? "—"}</p>
            <p className="text-sm text-text-secondary">
              {tasker?.phone ? (
                <a href={`tel:${tasker.phone}`} className="hover:text-primary">
                  {tasker.phone}
                </a>
              ) : (
                "No phone"
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="rounded-lg border border-border bg-surface px-4 py-2">
            <p className="text-xs text-text-muted">Agreed Amount</p>
            <p className="text-xl font-bold text-primary">
              K{Number(job.fixed_price).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface px-4 py-2">
            <p className="text-xs text-text-muted">Created</p>
            <p className="text-sm text-text">
              {new Date(job.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {job.status === "client_confirmed" && (
          <div className="mt-6">
            <Link
              href="/admin/release-payment"
              className="inline-flex items-center rounded-lg bg-success px-4 py-2 text-sm font-semibold text-white hover:bg-success/90 transition-colors"
            >
              Release Payment &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
