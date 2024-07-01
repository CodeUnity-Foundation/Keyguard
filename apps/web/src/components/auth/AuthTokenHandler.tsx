"use client";

import { deleteCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

export default function AuthTokenHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      setCookie("access_token", accessToken);
    } else {
      deleteCookie("access_token");
    }
  }, []);

  return <>{children}</>;
}
