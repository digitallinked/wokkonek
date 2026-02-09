import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type UserRole = "client" | "tasker" | "admin";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/choose-role");
  }

  if (profile.status === "suspended") {
    redirect("/suspended");
  }

  if (profile.role !== role) {
    // Redirect to the user's correct dashboard
    redirect(`/${profile.role}/dashboard`);
  }

  return { user, profile };
}

export async function requireProfileComplete() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.role) {
    redirect("/choose-role");
  }

  return { user, profile };
}
