import { IUser } from "@keyguard/lib/server";

export interface UserJWTData {
  email: string;
  iat: number;
  exp: number;
}

export interface UserRequest {
  user: IUser;
}
