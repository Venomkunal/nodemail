import { NextResponse } from "next/server";

export function middleware(request) {
  const isLoggedIn = request.cookies.get("auth")?.value;

  const { pathname } = request.nextUrl;

  // Allow login page and API routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If not logged in → redirect to login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}