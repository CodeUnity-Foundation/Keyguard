import { checkValidAccessToken } from "../middlewares/checkValidAccessToken";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware";
import { procedure } from "../trpc/trpc";

export const protectedProcedure = procedure.use(userAuthMiddleware);
export const masterProtectedProcedure = protectedProcedure.use(checkValidAccessToken);
