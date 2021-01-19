export interface UserToken{
  sub: string;
  id: number;
  isAdmin: boolean;
  isBanned: boolean;
  exp: number;
  iat: number;
}
