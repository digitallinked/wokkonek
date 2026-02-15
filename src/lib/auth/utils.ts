/** Returns the default dashboard path for a profile (used for post-login redirects). */
export function getDefaultDashboard(profile: {
  role: string;
  is_client?: boolean;
  is_tasker?: boolean;
}) {
  if (profile.role === "admin") return "/admin/dashboard";
  const isClient = profile.is_client ?? profile.role === "client";
  const isTasker = profile.is_tasker ?? profile.role === "tasker";
  if (isClient) return "/client/dashboard";
  if (isTasker) return "/tasker/dashboard";
  return "/choose-role";
}
