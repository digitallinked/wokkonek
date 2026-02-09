import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { JobPostingForm } from "./_components/job-posting-form";

export default async function NewJobPage() {
  await requireRole("client");
  const supabase = await createClient();

  const [{ data: categories }, { data: provinces }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, icon")
      .eq("is_active", true)
      .order("sort_order"),
    supabase.from("provinces").select("id, name, code").order("sort_order"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Post a Job</h1>
      <p className="mt-1 text-text-secondary">
        Describe what you need done, set your budget, and publish.
      </p>

      <div className="mt-8 max-w-2xl">
        <JobPostingForm
          categories={categories ?? []}
          provinces={provinces ?? []}
        />
      </div>
    </div>
  );
}
