import { PORT, connectToDB } from "@keyguard/database";
import { logger } from "@keyguard/lib";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application } from "express";

import { Response } from "../constants";
import { appRouter } from "../routes";
import { TRPCContext, createContextInner } from "../trpc/createContext";

const app: Application = express();

app.use(cors());

connectToDB();

app.use(express.json());

// helth check route
app.get("/health-check", (req, res) => {
  res.send("OK");
});

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext: createContextInner as unknown as () => Promise<TRPCContext>,
    async onError({ error, ctx }) {
      const ctx_session = ctx?.session;

      if (ctx_session?.transaction.isActive) {
        await ctx_session.abortTransaction();
        await ctx_session.endSession();
      }

      logger.error({
        api: ctx?.req?.url,
        name: error.name,
        message: error.message,
      });

      if (error.code === "INTERNAL_SERVER_ERROR") {
        delete error.stack;
        error.message = Response.INTERNAL_SERVER_ERROR;
      }
    },
  })
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
