import mongoose from "mongoose";

import { IDynamicFields } from "./types";

const DynamicFieldsSchema = new mongoose.Schema<IDynamicFields>(
  {
    // password_id: { type: mongoose.Schema.Types.ObjectId, ref: "Password" },
    password_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "PasswordCategory" },
    field_name: { type: String, required: true },
    field_type: { type: String, required: true },
    field_value: { type: String },
    mandatory: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, strict: true }
);

DynamicFieldsSchema.index({ password_category_id: 1, field_name: 1 });

export const DynamicFields = mongoose.model("DynamicFields", DynamicFieldsSchema);
