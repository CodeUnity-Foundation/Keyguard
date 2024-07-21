import { initTRPC } from "@trpc/server";

import { createContextInner } from "./createContext";

export const tRPCContext = initTRPC.context<typeof createContextInner>().create();

export const router = tRPCContext.router;
export const middleware = tRPCContext.middleware;
export const mergeRouters = tRPCContext.mergeRouters;

export const procedure = tRPCContext.procedure;
