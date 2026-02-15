"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({
  displayName,
  isClient,
  isTasker,
}: {
  displayName: string | null;
  isClient: boolean;
  isTasker: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initial = (displayName || "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-white py-1 shadow-lg z-50">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-text truncate">
              {displayName || "User"}
            </p>
          </div>
          <Link
            href={isClient ? "/client/jobs" : "/tasker/jobs"}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-muted hover:text-text transition-colors"
            onClick={() => setOpen(false)}
          >
            My tasks
          </Link>
          {(isClient || isTasker) && (
            <Link
              href={isClient ? "/client/dashboard" : "/tasker/dashboard"}
              className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-muted hover:text-text transition-colors"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/how-it-works"
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-muted hover:text-text transition-colors"
            onClick={() => setOpen(false)}
          >
            How it works
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              handleSignOut();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-light transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
