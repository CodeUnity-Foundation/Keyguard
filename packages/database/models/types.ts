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
  emailVerification: {
    otp: string;
    otp_expiry: Date;
  } | null;
  isLinkExpired: boolean;
  refreshToken?: string;
  deletedAt?: Date;
}

export interface IPassword extends Document {
  password_id: string;
  name: string;
  user_id: mongoose.Types.ObjectId;
  folder_id?: mongoose.Types.ObjectId;
  password_category_id: mongoose.Types.ObjectId;
  notes?: string;
  password_policy_id: mongoose.Types.ObjectId;
}

export interface IFolder extends Document {
  folder_id: string;
  folder_name: string;
  user_id: mongoose.Types.ObjectId;
}

export interface IPasswordCategory extends Document {
  password_category_id: string;
  category_name: string;
  user_id: mongoose.Types.ObjectId;
}

export interface IDynamicFields extends Document {
  dynamic_field_id: string;
  password_id: mongoose.Types.ObjectId;
  password_category_id: mongoose.Types.ObjectId;
  field_name: string;
  field_type: string;
  field_value: string;
  mandatory: boolean;
}
