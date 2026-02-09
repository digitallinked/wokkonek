"use server";

import { createClient } from "@/lib/supabase/server";

// ─── Category Management ───

export async function createCategory(name: string, icon?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Not authorized" };

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Get max sort_order
  const { data: maxOrder } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const { error } = await supabase.from("categories").insert({
    name: name.trim(),
    slug,
    icon: icon || null,
    sort_order: (maxOrder?.sort_order ?? 0) + 1,
  });

  if (error) return { error: error.message };

  // Log
  await supabase.from("admin_actions").insert({
    admin_id: user.id,
    action_type: "create_category",
    entity_type: "category",
    entity_id: "00000000-0000-0000-0000-000000000000",
    metadata: { name, slug },
  });

  return { success: true };
}

export async function toggleCategory(categoryId: string, isActive: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Not authorized" };

  const { error } = await supabase
    .from("categories")
    .update({ is_active: isActive })
    .eq("id", categoryId);

  if (error) return { error: error.message };

  return { success: true };
}

// ─── User Management ───

export async function toggleUserSuspend(userId: string, suspend: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Not authorized" };

  // Prevent self-suspension
  if (userId === user.id) return { error: "Cannot suspend yourself" };

  const newStatus = suspend ? "suspended" : "active";

  const { error } = await supabase
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", userId);

  if (error) return { error: error.message };

  // Log
  await supabase.from("admin_actions").insert({
    admin_id: user.id,
    action_type: suspend ? "suspend_user" : "unsuspend_user",
    entity_type: "profile",
    entity_id: userId,
    metadata: { new_status: newStatus },
  });

  return { success: true };
}
