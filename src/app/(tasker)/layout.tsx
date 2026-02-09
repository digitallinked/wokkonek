import Link from "next/link";
import { requireRole } from "@/lib/auth/guards";
import { SignOutButton } from "@/components/sign-out-button";

export default async function TaskerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole("tasker");

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
                href="/tasker/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/tasker/jobs"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/tasker/assigned"
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Assigned Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
