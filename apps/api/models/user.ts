import mongoose from 'mongoose';
import { IUser } from './types';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    profile: { type: String },
    is_verified: { type: Boolean },
    master_password: { type: String },
    emailVerification: {
      otp: { type: Number },
      otp_expiry: { type: Date },
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
