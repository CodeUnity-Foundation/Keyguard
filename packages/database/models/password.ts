import mongoose from "mongoose";

import { IPassword } from "./types";

const PasswordSchema = new mongoose.Schema<IPassword>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: false },
    name: { type: String, required: true, unique: false, trim: true },
    folder_id: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", unique: false, required: false },
    password_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PasswordCategory",
      unique: false,
    },
    url: { type: String, required: false, trim: true },
    notes: { type: String, required: false, trim: true },
    // password_policy_id: { type: mongoose.Schema.Types.ObjectId, ref: "PasswordPolicy" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

PasswordSchema.index({ name: 1, user_id: 1, password_category_id: 1 }, { unique: true });

export const Password = mongoose.model("Password", PasswordSchema);
