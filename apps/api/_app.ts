import { PORT, connectToDB } from "@keyguard/database";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { Application } from "express";

import { appRouter } from "./routes";
import { TRPCContext, createContextInner } from "./trpc/createContext";

const app: Application = express();

app.use(cors());

connectToDB();

app.use(express.json());

// helth check route
app.get("/", (req, res) => {
  res.send("OK");
});

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContextInner as unknown as () => Promise<TRPCContext>,
  })
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
