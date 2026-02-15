import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Wok Konek. Empowering local
              skills in PNG.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
              <Link href="/about" className="hover:text-text transition-colors">
                About
              </Link>
              <Link href="/how-it-works" className="hover:text-text transition-colors">
                How it works
              </Link>
              <Link href="/contact" className="hover:text-text transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-text transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-text transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
