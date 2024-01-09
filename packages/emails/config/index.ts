import * as dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env;

//* Mail config
export const EMAIL = NODE_ENV.EMAIL;
export const EMAIL_PASSWORD = NODE_ENV.EMAIL_PASSWORD;
