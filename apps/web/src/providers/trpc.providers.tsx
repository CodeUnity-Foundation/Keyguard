"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "../utils/trpc";

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  const newQueryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000 },
    },
  });

  const [queryClient] = useState(newQueryClient);

  const url = process.env.NEXT_PUBLIC_WEBAPP_URL
    ? process.env.NEXT_PUBLIC_WEBAPP_URL
    : "http://localhost:3000/api/";

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpLink({ url })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
