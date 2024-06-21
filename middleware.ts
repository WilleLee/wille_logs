import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware({ nextUrl }: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token");
  console.log("accessToken", accessToken);
  const isLoggedin = !!accessToken;

  const protectedRoutes = process.env.PROTECTED_ROUTES?.split(",") || [];
  const publicOnlyRoutes = process.env.PUBLIC_ONLY_ROUTES?.split(",") || [];

  // edge runtime에서는 jwt.verify를 사용할 수 없음
  // access token이 존재하는 경우, 유효한지 검증
  // if (isLoggedin) {
  //   jwt.verify(accessToken.value, process.env.AUTH_SECRET as string, (err) => {
  //     if (err) {
  //       cookies().delete("access-token");
  //       return NextResponse.redirect(new URL("/", nextUrl));
  //     }
  //   });
  // }

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

  console.log("isLoggedin", isLoggedin);

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
