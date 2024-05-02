import { IUser } from "@keyguard/database";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Don't check for public routes.
  if (pathname === "/auth/login" || pathname === "/auth/signup" || pathname === "/auth/verify-otp") return;

  const token = request.headers.get("authorization") || request.cookies.get("keyguard_auth_token")?.value;

  if (!token && pathname !== "/auth/login" && pathname !== "/auth/signup") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const email = request.cookies.get("email")?.value;

  const res = await fetch(`http://localhost:3000/api/get-logged-user?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user: IUser | null = await res.json();

  if (!user?.is_verified) {
    return NextResponse.redirect(new URL("/auth/verify-otp", request.url));
  }

  if (!user?.master_password) {
    return NextResponse.redirect(new URL("/auth/set-master", request.url));
  }

  NextResponse.redirect(new URL("/auth/login-master", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
