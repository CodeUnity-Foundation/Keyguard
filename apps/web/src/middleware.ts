import { IUser } from "@keyguard/database";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("keyguard_auth_token")?.value;
  const accessToken = request.cookies.get("access_token")?.value;

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

  // Fetch the loggedIn user informations fron db.
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

  // If user is not found and i am on the steps which comes after login, redirect to login page.
  if (!user && pathname !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If user found, but not verified and i am not on the verify-otp page, redirect them to verify the otp.
  if (!user?.is_verified && pathname !== "/auth/verify-otp") {
    return NextResponse.redirect(new URL("/auth/verify-otp", request.url));
  }

  // If user is verified but the master-password is not been set before, redirect them to set the master password. This case will rise when user accessing the portal 1st time.
  if (user?.is_verified && !user?.master_password && pathname !== "/auth/set-master") {
    return NextResponse.redirect(new URL("/auth/set-master", request.url));
  }

  // If user is verified and the master-password has been already set, give an access to login the dashboard with master-password.
  if (user?.is_verified && user?.master_password && pathname !== "/auth/login-master" && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login-master", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
