import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MakeOfferButton } from "./_components/make-offer-button";

export default async function BrowseTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select(
      "id, title, description, fixed_price, status, created_at, category:categories(name, icon), province:provinces(name), district:districts(name)"
    )
    .eq("id", id)
    .eq("status", "open")
    .single();

  if (!job) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role, is_tasker")
        .eq("id", user.id)
        .single()
    : { data: null };

  const category = job.category as unknown as { name: string; icon?: string } | null;
  const province = job.province as unknown as { name: string } | null;
  const district = job.district as unknown as { name: string } | null;

  return (
    <div className="min-h-screen bg-bg-muted">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/browse"
          className="text-sm text-text-secondary hover:text-text transition-colors"
        >
          &larr; Back to Browse tasks
        </Link>

        <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-text">{job.title}</h1>
          <p className="mt-2 text-sm text-text-secondary">
            {category?.icon} {category?.name} &middot; {province?.name}
            {district?.name && ` / ${district.name}`}
          </p>

          <p className="mt-4 text-text whitespace-pre-wrap">
            {job.description || "No description provided."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-xs text-text-muted">Budget</p>
              <p className="text-2xl font-bold text-primary">
                K{Number(job.fixed_price).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MakeOfferButton
            jobId={job.id}
            isLoggedIn={!!user}
            isTasker={profile?.is_tasker ?? false}
          />
        </div>
      </div>
    </div>
  );
}
