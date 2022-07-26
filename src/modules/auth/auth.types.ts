export interface JwtPayload {
  sub: number;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}
