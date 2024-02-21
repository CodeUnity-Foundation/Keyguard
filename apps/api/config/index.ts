import * as dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env;

//* Database connection config
export const PORT = NODE_ENV.PORT ?? 8001;
export const DB_USERNAME = NODE_ENV.DB_USERNAME;
export const DB_PASSWORD = NODE_ENV.DB_PASSWORD;
export const DB_NAME = NODE_ENV.DB_NAME;
export const CLUSTER_URL = NODE_ENV.CLUSTER_URL;

//* JWT config
export const JWT_SECRET = NODE_ENV.JWT_SECRET || "secret";

export const MODE = NODE_ENV.MODE;
