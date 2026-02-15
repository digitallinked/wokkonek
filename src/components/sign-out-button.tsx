"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className={
        variant === "dark"
          ? "text-sm font-medium text-gray-300 hover:text-white transition-colors"
          : "text-sm font-medium text-text-muted hover:text-text transition-colors"
      }
    >
      Sign out
    </button>
  );
}
