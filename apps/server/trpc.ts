import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
