import mongoose from "mongoose";

import { IPasswordCategory } from "./types";

/**
 ** Schema for password category
 */
const PasswordCategorySchema = new mongoose.Schema<IPasswordCategory>(
  {
    category_name: { type: String, required: true, unique: true, trim: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: false, required: false },
    is_default: { type: Boolean, required: true, default: false },
    is_visible: { type: Boolean, required: true, default: true },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

PasswordCategorySchema.index({ category_name: 1, user_id: 1 }, { unique: true });

export const PasswordCategory = mongoose.model("PasswordCategory", PasswordCategorySchema);
