import mongoose from "mongoose";

import { IDynamicFields } from "./types";

const DynamicFieldsSchema = new mongoose.Schema<IDynamicFields>(
  {
    dynamic_field_id: { type: String, required: true, unique: true },
    password_id: { type: mongoose.Schema.Types.ObjectId, ref: "Password" },
    password_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "PasswordCategory" },
    field_name: { type: String, required: true, unique: true },
    field_type: { type: String, required: true, unique: true },
    field_value: { type: String, required: true, unique: true },
    mandatory: { type: Boolean, required: true, unique: true, default: false },
  },
  { timestamps: true, strict: true }
);

export const DynamicFields = mongoose.model("DynamicFields", DynamicFieldsSchema);
