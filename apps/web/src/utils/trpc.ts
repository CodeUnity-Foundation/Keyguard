import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "./../../../api/routes/index";

export const trpc = createTRPCReact<AppRouter>({});
