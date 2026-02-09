import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-muted">
      <header className="border-b border-border bg-bg">
        <nav className="mx-auto max-w-7xl flex items-center px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-primary">Wok</span>{" "}
            <span className="text-text">Konek</span>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}
