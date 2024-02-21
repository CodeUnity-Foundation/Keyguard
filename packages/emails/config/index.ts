import * as dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env;

//* Mail config
export const USER = NODE_ENV.USER;
export const PASSWORD = NODE_ENV.PASSWORD;
export const FROM_EMAIL = NODE_ENV.FROM_EMAIL;
