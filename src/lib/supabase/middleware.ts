import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected route prefixes
  const protectedPrefixes = ["/client", "/tasker", "/admin"];
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages (sign-in/sign-up)
  const authPrefixes = ["/sign-in", "/sign-up"];
  const isAuthRoute = authPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (user && isAuthRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, display_name, is_client, is_tasker")
      .eq("id", user.id)
      .single();

    // Profile complete: has display_name and at least one role
    const hasDisplayName = profile?.display_name?.trim?.();
    const hasRole =
      profile?.is_client || profile?.is_tasker || profile?.role === "admin";

    if (hasDisplayName && hasRole) {
      const redirectTo = request.nextUrl.searchParams.get("redirect");
      const isProtected =
        redirectTo &&
        (redirectTo.startsWith("/client") ||
          redirectTo.startsWith("/tasker") ||
          redirectTo.startsWith("/admin"));
      const canAccess =
        isProtected &&
        ((redirectTo.startsWith("/tasker") && profile?.is_tasker) ||
          (redirectTo.startsWith("/client") && profile?.is_client) ||
          (redirectTo.startsWith("/admin") && profile?.role === "admin"));

      if (canAccess && redirectTo?.startsWith("/")) {
        const url = request.nextUrl.clone();
        url.pathname = redirectTo;
        url.searchParams.delete("redirect");
        return NextResponse.redirect(url);
      }

      const url = request.nextUrl.clone();
      if (profile.role === "admin") {
        url.pathname = "/admin/dashboard";
      } else if (profile.is_client) {
        url.pathname = "/client/dashboard";
      } else {
        url.pathname = "/tasker/dashboard";
      }
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }

    // New user or incomplete profile → choose-role
    const url = request.nextUrl.clone();
    url.pathname = "/choose-role";
    url.searchParams.delete("redirect");
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
