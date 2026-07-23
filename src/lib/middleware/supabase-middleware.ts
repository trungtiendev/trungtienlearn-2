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
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Public routes that don't require authentication
  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/courses", "/course/", "/products", "/product/", "/blog", "/post/"];
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // Private routes that require authentication
  if (!isPublicPath && !user) {
    // No user, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You can safely remove this check to protect middleware
  // This key is stored in the browser's localStorage and is only used to
  // prevent the UI from showing authenticated flows.
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isValidSupabaseKey = supabaseKey !== "placeholder";
  if (!isValidSupabaseKey) {
    throw new Error("Missing Supabase key. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  }

  return supabaseResponse;
}
