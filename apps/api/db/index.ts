import mongoose, { ConnectOptions } from 'mongoose';
import { CLUSTER_URL, DB_NAME, DB_PASSWORD, DB_USERNAME, MODE } from '../config';
import { logger } from '../utils/logger';

if (!DB_USERNAME || !DB_PASSWORD || !CLUSTER_URL || !DB_NAME) {
  throw new Error(`Missing environment variables for MongoDB connection`);
}

const DEV_URL = `mongodb://localhost:27017/${DB_NAME}`;

const PROD_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`;

const MONGODB_URI = MODE === 'prod' ? PROD_URL : DEV_URL;

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('⚡️[DB]: Connected successfully!');
  } catch (error) {
    logger.error(`❌[DB]: Could not connect. Here is the error: ${error as string}`);
    process.exit();
  }
}

export default connectToDB;
