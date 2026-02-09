import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Navigation ─── */}
      <header className="border-b border-border bg-bg sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-primary">Wok</span>{" "}
            <span className="text-text">Konek</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-text-secondary hover:text-text transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── Content ─── */}
      <main className="flex-1">{children}</main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Wok Konek. Empowering local
              skills in PNG.
            </p>
            <div className="flex gap-6 text-sm text-text-secondary">
              <Link href="#" className="hover:text-text transition-colors">
                About
              </Link>
              <Link href="#" className="hover:text-text transition-colors">
                How it works
              </Link>
              <Link href="#" className="hover:text-text transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
