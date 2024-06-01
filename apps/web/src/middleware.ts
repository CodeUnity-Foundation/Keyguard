import { IUser } from "@keyguard/database";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("keyguard_auth_token")?.value;

  // Redirect to login page if user is not authenticated.
  if (
    !token &&
    pathname !== "/auth/login" &&
    pathname !== "/auth/signup" &&
    pathname !== "/auth/verify-otp"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Don't check for public routes.
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    return;
  }

  let user: IUser | null = null;
  try {
    const res = await fetch(`http://localhost:8000/api/auth.getLoggedUser?authToken=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await res.json();
    user = parsedResponse.result.data.user;
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!user && pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!user?.is_verified && pathname !== "/auth/verify-otp") {
    return NextResponse.redirect(new URL("/auth/verify-otp", request.url));
  }

  if (user?.is_verified && !user?.master_password && pathname !== "/auth/set-master") {
    return NextResponse.redirect(new URL("/auth/set-master", request.url));
  }

  if (user?.is_verified && user?.master_password && pathname !== "/auth/login-master") {
    return NextResponse.redirect(new URL("/auth/login-master", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
