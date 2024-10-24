import mongoose from "mongoose";

import { IPassword } from "./types";

const PasswordSchema = new mongoose.Schema<IPassword>(
  {
    password_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true, unique: true },
    folder_id: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    password_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PasswordCategory",
    },
    notes: { type: String },
    // password_policy_id: { type: mongoose.Schema.Types.ObjectId, ref: "PasswordPolicy" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

export const Password = mongoose.model("Password", PasswordSchema);
