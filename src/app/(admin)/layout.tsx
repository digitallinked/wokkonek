import Link from "next/link";
import { requireRole } from "@/lib/auth/guards";
import { SignOutButton } from "@/components/sign-out-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole("admin");

  return (
    <div className="min-h-screen flex flex-col bg-bg-muted">
      <header className="border-b border-border bg-bg sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-primary">Wok</span>{" "}
              <span className="text-text">Konek</span>
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/payments"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Payments
              </Link>
              <Link
                href="/admin/categories"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/admin/users"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Users
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-danger-light text-danger text-xs font-semibold px-2 py-0.5">
              Admin
            </span>
            <span className="text-sm text-text-secondary">
              {profile.display_name}
            </span>
            <SignOutButton />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
