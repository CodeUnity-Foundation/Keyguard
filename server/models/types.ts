export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile?: string;
  otp?: number;
  otp_expiry?: Date;
  is_verified: boolean;
  master_password?: string;
}
