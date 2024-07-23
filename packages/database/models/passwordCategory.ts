import mongoose from "mongoose";

import { IPasswordCategory } from "./types";

const PasswordCategorySchema = new mongoose.Schema<IPasswordCategory>(
  {
    password_category_id: { type: String, required: true, unique: true },
    category_name: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: true }
);

export const PasswordCategory = mongoose.model("PasswordCategory", PasswordCategorySchema);
