import mongoose from "mongoose";

import { IFolder } from "./types";

const FolderSchema = new mongoose.Schema<IFolder>(
  {
    folder_name: { type: String, required: true, unique: false, trim: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: true,
  }
);

FolderSchema.index({ folder_name: 1, user_id: 1 }, { unique: true });

export const Folder = mongoose.model("Folder", FolderSchema);
