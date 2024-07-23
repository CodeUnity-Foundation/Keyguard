import mongoose from "mongoose";

import { IFolder } from "./types";

const FolderSchema = new mongoose.Schema<IFolder>(
  {
    folder_id: { type: String, required: true, unique: true },
    folder_name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: true }
);

export const Folder = mongoose.model("Folder", FolderSchema);
