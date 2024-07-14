"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { useState } from "react";

import { BACKEND_URL } from "../utils/envvariables";
import { trpc } from "../utils/trpc";

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const newQueryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000 },
    },
  });

  const [queryClient] = useState(newQueryClient);

  const url = BACKEND_URL;

  const logoutAll = () => {
    deleteCookie("access_token");
    deleteCookie("keyguard_auth_token");
    localStorage.removeItem("$stored_person_properties");
    location.replace("/auth/login");
  };

  const logout = () => {
    deleteCookie("access_token");
    location.replace("/auth/login-master");
  };

  const getNewAccessToken = async () => {
    try {
      const res = await fetch(`${url}/auth.refreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getCookie("keyguard_auth_token")}`,
        },
      });
      const parsedResponse = await res.json();
      const tokenRes = parsedResponse.result.data;
      if (tokenRes.status === 200 && tokenRes.success) {
        setCookie("access_token", tokenRes.newAccessToken);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url,
          async headers() {
            return {
              Authorization: `${getCookie("keyguard_auth_token")}`,
              "x-access-token": `${getCookie("access_token")}`,
            };
          },
          async fetch(url, options) {
            const response = await fetch(url, options);
            if (response.status === 401) {
              const headers = options?.headers as Record<string, string>;
              const xAccessToken = headers["x-access-token"];

              if (xAccessToken) {
                await getNewAccessToken();
                return fetch(url, options);
              }

              logoutAll();
            }
            return response;
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
