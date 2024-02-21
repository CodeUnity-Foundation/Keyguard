import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application } from "express";

import { PORT } from "./config";
import { TRPCContext, createContextInner } from "./createContext";
import connectToDB from "./db";
import { appRouter } from "./routes";

const app: Application = express();

connectToDB();

app.use(cors());

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContextInner as unknown as () => Promise<TRPCContext>,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
