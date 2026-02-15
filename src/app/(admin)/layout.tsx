import Link from "next/link";
import Image from "next/image";
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
      <header className="border-b border-white/10 bg-black sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <Image
                src="/assets/wokkonek_logo_no-bg.png"
                alt="Wok Konek"
                width={140}
                height={44}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/payments"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Payments
              </Link>
              <Link
                href="/admin/categories"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/admin/users"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Users
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-danger/20 text-red-300 text-xs font-semibold px-2 py-0.5">
              Admin
            </span>
            <span className="text-sm text-gray-300">
              {profile.display_name}
            </span>
            <SignOutButton variant="dark" />
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
