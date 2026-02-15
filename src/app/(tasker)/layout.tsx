import Link from "next/link";
import Image from "next/image";
import { requireRole } from "@/lib/auth/guards";
import { UserMenu } from "@/components/user-menu";

export default async function TaskerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole("tasker");

  return (
    <div className="min-h-screen flex flex-col bg-bg-muted">
      <header className="border-b border-white/10 bg-black sticky top-0 z-50 shadow-sm">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90"
            >
              <Image
                src="/assets/wokkonek_logo_no-bg.png"
                alt="Wok Konek"
                width={140}
                height={44}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link
                href="/client/jobs/new"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
              >
                Post a task
              </Link>
              <Link
                href="/browse"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Browse tasks
              </Link>
              <Link
                href="/tasker/jobs"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                My tasks
              </Link>
              <Link
                href="/tasker/assigned"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Assigned Jobs
              </Link>
              <Link
                href="/tasker/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            {profile.is_client && (
              <Link
                href="/client/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Switch to Client
              </Link>
            )}
            <UserMenu
              displayName={profile.display_name}
              isClient={profile.is_client}
              isTasker={profile.is_tasker}
            />
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
