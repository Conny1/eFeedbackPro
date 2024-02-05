import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;
  const isPublicPath =
    urlPath === "/auth" || urlPath === "/:id" || urlPath === "/";
  const token = request.cookies.get("token")?.value;
  // console.log(token);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard", "/auth", "/:id", "/dashboard/subscription"],
};
