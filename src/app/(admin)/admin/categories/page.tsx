import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { AddCategoryForm } from "./_components/add-category-form";
import { ToggleCategoryButton } from "./_components/toggle-category-button";

export default async function AdminCategoriesPage() {
  await requireRole("admin");
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Manage Categories</h1>
      <p className="mt-1 text-text-secondary">
        Add, enable, or disable job categories.
      </p>

      {/* Add new category */}
      <div className="mt-6 max-w-md">
        <AddCategoryForm />
      </div>

      {/* Category list */}
      <div className="mt-8">
        <div className="rounded-lg border border-border bg-bg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">
                  Icon
                </th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">
                  Slug
                </th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-text-secondary">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat) => (
                <tr key={cat.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{cat.icon || "—"}</td>
                  <td className="px-4 py-3 font-medium text-text">
                    {cat.name}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{cat.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        cat.is_active
                          ? "bg-success-light text-success"
                          : "bg-surface text-text-muted"
                      }`}
                    >
                      {cat.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ToggleCategoryButton
                      categoryId={cat.id}
                      isActive={cat.is_active}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
