import mongoose from 'mongoose';
import { IUser } from './types';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    master_password: { type: String },
    profile: { type: String },
    emailVerification: {
      otp: { type: Number },
      otp_expiry: { type: Date },
    },
    is_verified: { type: Boolean },
    isLinkExpired: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true, strict: true },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
