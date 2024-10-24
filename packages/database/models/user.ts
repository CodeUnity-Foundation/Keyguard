import mongoose from "mongoose";

import { IUser } from "./types";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    master_password: { type: String },
    profile: { type: String },
    email_verification: {
      otp: { type: String },
      otp_expiry: { type: Date },
    },
    is_verified: { type: Boolean },
    is_link_expired: { type: Boolean, default: false },
    refresh_token: { type: String },
    deleted_at: { type: Date },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
