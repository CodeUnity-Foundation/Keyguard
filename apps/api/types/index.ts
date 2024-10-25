export interface UserJWTData {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface MetaDataInterface {
  total_data: number;
  current_page: number;
  limit: number;
  total_pages: number;
}
