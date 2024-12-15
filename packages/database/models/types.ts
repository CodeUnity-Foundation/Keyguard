import { Document } from "mongodb";
import mongoose from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile?: string;
  is_verified: boolean;
  master_password?: string;
  email_verification: {
    otp: string;
    otp_expiry: Date;
  } | null;
  is_link_expired: boolean;
  refresh_token?: string;
  deleted_at?: Date | null;
}

export interface IPassword extends Document {
  _id: string;
  name: string;
  user_id: mongoose.Types.ObjectId;
  folder_id?: mongoose.Types.ObjectId;
  password_category_id: mongoose.Types.ObjectId;
  notes?: string;
  password_policy_id: mongoose.Types.ObjectId;
}

export interface IFolder extends Document {
  _id: string;
  folder_name: string;
  user_id: mongoose.Types.ObjectId;
}

export interface IPasswordCategory extends Document {
  _id: string;
  category_name: string;
  user_id: mongoose.Types.ObjectId;
  is_default: boolean;
  fields: { field_name: string; field_value: string; mandatory: boolean }[];
  is_visible: boolean;
  deleted_at?: Date | null;
}

export interface IDynamicFields extends Document {
  _id: string;
  password_id?: mongoose.Types.ObjectId;
  password_category_id: mongoose.Types.ObjectId;
  field_name: string;
  field_type: string;
  field_value?: string;
  mandatory: boolean;
  deleted_at?: Date | null;
}
