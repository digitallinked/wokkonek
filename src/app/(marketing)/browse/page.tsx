import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BrowseTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; province?: string; q?: string }>;
}) {
  const { category, province, q } = await searchParams;
  const supabase = await createClient();

  const [{ data: categories }, { data: provinces }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, icon")
      .eq("is_active", true)
      .order("sort_order"),
    supabase.from("provinces").select("id, name").order("sort_order"),
  ]);

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
  if (q?.trim()) {
    const term = `%${q.trim()}%`;
    query = query.or(`title.ilike.${term},description.ilike.${term}`);
  }

  const { data: jobs } = await query;

  return (
    <div className="min-h-screen bg-bg-muted">
      {/* Hero section */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Browse tasks. Get it done.
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/90">
            Find tasks in your area or post your own to get offers from skilled
            locals.
          </p>

          {/* Search bar */}
          <form
            action="/browse"
            method="get"
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="What do you need done?"
              className="flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <select
              name="category"
              defaultValue={category ?? ""}
              className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">All categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            <select
              name="province"
              defaultValue={province ?? ""}
              className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">All provinces</option>
              {provinces?.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Task grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-text">
          Open tasks
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Make an offer on tasks that match your skills. Sign up to get started.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!jobs || jobs.length === 0 ? (
            <div className="col-span-full rounded-xl border border-border bg-white p-12 text-center">
              <p className="text-text-secondary">
                No open tasks found.{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary hover:text-primary-hover"
                >
                  Post your first task
                </Link>{" "}
                to get started.
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <TaskCard key={job.id} job={job} />
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-text">
            Can&apos;t find what you need?
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Post a task and get offers from skilled taskers in your area.
          </p>
          <Link
            href="/client/jobs/new"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
          >
            Post a task & get offers
          </Link>
        </div>
      </section>
    </div>
  );
}

function TaskCard({
  job,
}: {
  job: {
    id: string;
    title: string;
    description: string | null;
    fixed_price: number | string;
    created_at: string;
    category: unknown;
    province: unknown;
    district: unknown;
  };
}) {
  const category = job.category as { name: string; icon?: string } | null;
  const province = job.province as { name: string } | null;
  const district = job.district as { name: string } | null;

  return (
    <Link
      href={`/browse/${job.id}`}
      className="block rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
    >
      <h3 className="font-semibold text-text line-clamp-2">{job.title}</h3>
      <p className="mt-2 text-sm text-text-secondary line-clamp-2">
        {job.description || "No description"}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          K{Number(job.fixed_price).toLocaleString()}
        </span>
        <span className="text-xs text-text-muted">
          {category?.icon} {category?.name} &middot; {province?.name}
          {district?.name && ` / ${district.name}`}
        </span>
      </div>
      <span className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-hover">
        View task →
      </span>
    </Link>
  );
}
