import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/guards";
import { SuspendUserButton } from "./_components/suspend-user-button";

export default async function AdminUsersPage() {
  await requireRole("admin");
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, display_name, phone, role, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">User Management</h1>
      <p className="mt-1 text-text-secondary">
        View and manage all registered users.
      </p>

      <div className="mt-6 rounded-lg border border-border bg-bg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                Phone
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">
                Joined
              </th>
              <th className="px-4 py-3 text-right font-medium text-text-secondary">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-text">
                  {u.display_name || "—"}
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {u.phone || "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-danger-light text-danger"
                        : u.role === "client"
                        ? "bg-primary-light text-primary"
                        : "bg-secondary-light text-secondary"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.status === "active"
                        ? "bg-success-light text-success"
                        : "bg-danger-light text-danger"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-muted">
                  {new Date(u.created_at).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-right">
                  {u.role !== "admin" && (
                    <SuspendUserButton
                      userId={u.id}
                      isSuspended={u.status === "suspended"}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
