import { IUser } from "@keyguard/database";

export interface UserJWTData {
  email: string;
  iat: number;
  exp: number;
}

export interface UserRequest {
  user: IUser;
}
