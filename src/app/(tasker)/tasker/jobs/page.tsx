import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";

export default async function TaskerBrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; province?: string }>;
}) {
  await requireRole("tasker");
  const { category, province } = await searchParams;
  const supabase = await createClient();

  // Fetch filter options
  const [{ data: categories }, { data: provinces }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, icon")
      .eq("is_active", true)
      .order("sort_order"),
    supabase.from("provinces").select("id, name").order("sort_order"),
  ]);

  // Build query for open jobs
  let query = supabase
    .from("jobs")
    .select(
      "id, title, description, fixed_price, created_at, category:categories(name, icon), province:provinces(name), district:districts(name)"
    )
    .eq("status", "open")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category_id", category);
  }
  if (province) {
    query = query.eq("province_id", province);
  }

  const { data: jobs } = await query;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Browse Jobs</h1>
      <p className="mt-1 text-text-secondary">
        Find jobs that match your skills and location.
      </p>

      {/* Filters */}
      <form className="mt-6 flex flex-wrap gap-3">
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>

        <select
          name="province"
          defaultValue={province ?? ""}
          className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          <option value="">All Provinces</option>
          {provinces?.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-hover transition-colors"
        >
          Filter
        </button>
      </form>

      {/* Job listings */}
      <div className="mt-6 space-y-4">
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-bg p-8 text-center">
            <p className="text-text-secondary">
              No open jobs found. Check back soon!
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/tasker/jobs/${job.id}`}
              className="block rounded-lg border border-border bg-bg p-4 hover:border-secondary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text">{job.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                    {job.description}
                  </p>
                  <p className="mt-2 text-xs text-text-muted">
                    {(job.category as unknown as { icon?: string; name: string } | null)
                      ?.icon}{" "}
                    {(job.category as unknown as { name: string } | null)?.name} &middot;{" "}
                    {(job.province as unknown as { name: string } | null)?.name}
                    {(job.district as unknown as { name: string } | null)?.name &&
                      ` / ${(job.district as unknown as { name: string }).name}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-text">
                    K{Number(job.fixed_price).toLocaleString()}
                  </span>
                  <p className="text-xs text-text-muted">Fixed Price</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
