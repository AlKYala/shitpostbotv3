export interface UserToken{
  sub: string;
  isAdmin: boolean;
  isBanned: boolean;
  exp: number;
  iat: number;
}
