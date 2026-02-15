import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDefaultDashboard } from "./utils";

export type UserRole = "client" | "tasker" | "admin";
export { getDefaultDashboard } from "./utils";

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

  // Admin can access admin routes
  if (role === "admin") {
    if (profile.role !== "admin") {
      redirect(getDefaultDashboard(profile));
    }
    return { user, profile };
  }

  // Client/tasker: check is_client/is_tasker for dual-role support
  const isClient = profile.is_client ?? profile.role === "client";
  const isTasker = profile.is_tasker ?? profile.role === "tasker";

  if (role === "client" && !isClient) {
    redirect(isTasker ? "/tasker/dashboard" : "/choose-role");
  }
  if (role === "tasker" && !isTasker) {
    redirect(isClient ? "/client/dashboard" : "/choose-role");
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
