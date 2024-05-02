/* eslint-disable turbo/no-undeclared-env-vars */
export const BACKEND_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || "http://localhost:8000/api";
export const LOCAL_STORAGE_ENC_DEC_SECRET = process.env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET || "Keyguard-secret";
export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "secret";
