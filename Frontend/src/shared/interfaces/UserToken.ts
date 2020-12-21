export interface UserToken{
  sub: string;
  isAdmin: boolean;
  exp: number;
  iat: number;
}
