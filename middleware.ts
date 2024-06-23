import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware({ nextUrl }: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token");
  const isLoggedin = !!accessToken;

  const protectedRoutes = process.env.PROTECTED_ROUTES?.split(",") || [];
  const publicOnlyRoutes = process.env.PUBLIC_ONLY_ROUTES?.split(",") || [];

  let isProtectedRoute = false;
  for (let i = 0; i < protectedRoutes.length; i++) {
    if (nextUrl.pathname.startsWith(`/${protectedRoutes[i]}`)) {
      isProtectedRoute = true;
      break;
    }
  }

  if (isProtectedRoute && !isLoggedin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  let isPublicOnlyRoute = false;
  for (let i = 0; i < publicOnlyRoutes.length; i++) {
    if (nextUrl.pathname.startsWith(`/${publicOnlyRoutes[i]}`)) {
      isPublicOnlyRoute = true;
      break;
    }
  }

  if (isPublicOnlyRoute && isLoggedin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
