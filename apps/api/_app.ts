import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import express, { Application } from 'express';
import { appRouter } from './routes';
import connectToDB from './db';
import { createContext } from './trpc';
import { PORT } from './config';

const app: Application = express();

connectToDB();

app.use(cors());

app.use('/api', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
