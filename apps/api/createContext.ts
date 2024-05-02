import { IUser } from "@keyguard/database";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

type CreateContextOptions = CreateNextContextOptions;

export type CreateInnerContextOptions = {
  user?: Omit<IUser, "password" | "emailVerification">;
} & Partial<CreateContextOptions>;

export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    ...opts,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContextInner>>;
