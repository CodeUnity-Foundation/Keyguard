export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile?: string;
  is_verified: boolean;
  master_password?: string;
  emailVerification?: {
    otp?: string;
    otp_expiry?: Date;
  };
}
