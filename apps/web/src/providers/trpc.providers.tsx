"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { getCookie } from "cookies-next";
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

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url,
          async headers() {
            return {
              Authorization: `${getCookie("keyguard_auth_token")}`,
            };
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
