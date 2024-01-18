import { IUser } from '../models/types';

export interface UserJWTData {
  email: string;
  iat: number;
  exp: number;
}

export interface UserRequest {
  user: IUser;
}
