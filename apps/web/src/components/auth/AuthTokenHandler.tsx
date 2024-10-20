"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * @description: This component is used to handle access token. If access token is not present in session, then it will also remove it from the cookie.
 */
export default function AuthTokenHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const authToken = getCookie("keyguard_auth_token");
    const accessToken = sessionStorage.getItem("access_token");

    if (!authToken) return;

    if (!accessToken) {
      deleteCookie("access_token");
    }

    router.push("/dashboard");
  }, [router]);

  return <>{children}</>;
}
