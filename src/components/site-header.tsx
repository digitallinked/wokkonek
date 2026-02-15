import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: {
    display_name: string | null;
    is_client: boolean;
    is_tasker: boolean;
    role: string;
  } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, is_client, is_tasker, role")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const isLoggedIn = !!user;
  const myTasksHref =
    profile?.role === "client" || profile?.is_client
      ? "/client/jobs"
      : "/tasker/jobs";

  return (
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
            {isLoggedIn && (
              <Link
                href={myTasksHref}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                My tasks
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/how-it-works"
                className="hidden md:inline text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                How it works
              </Link>
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <UserMenu
                  displayName={profile?.display_name ?? null}
                  isClient={profile?.is_client ?? false}
                  isTasker={profile?.is_tasker ?? false}
                />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/how-it-works"
                className="hidden md:inline text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
