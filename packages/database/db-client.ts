import { logger } from "@keyguard/lib";
import mongoose from "mongoose";

import { CLUSTER_URL, DB_NAME, DB_PASSWORD, DB_USERNAME, MODE } from "./config";

if (MODE === "prod") {
  if (!DB_USERNAME || !DB_PASSWORD || !CLUSTER_URL || !DB_NAME) {
    throw new Error(`Missing environment variables for MongoDB connection`);
  }
}

const DEV_URL = CLUSTER_URL || "mongodb://localhost:27017/vaultmaster";

const PROD_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`;

const MONGODB_URI = MODE === "prod" ? PROD_URL : DEV_URL;

declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      family: 4,
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    logger.info("⚡️[DB]: Connected successfully!");
  } catch (error) {
    logger.error(`❌[DB]: Could not connect. Here is the error: ${error as string}`);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

connectToDB();
