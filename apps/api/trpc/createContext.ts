import { IUser } from "@keyguard/database";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import mongoose from "mongoose";

type CreateContextOptions = CreateNextContextOptions;

export type CreateInnerContextOptions = {
  user?: Omit<IUser, "password" | "emailVerification">;
} & Partial<CreateContextOptions>;

export async function createContextInner(opts: CreateInnerContextOptions) {
  const session = await mongoose.startSession();
  return {
    ...opts,
    session,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContextInner>>;
