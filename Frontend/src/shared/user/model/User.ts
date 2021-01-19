import {BaseEntity} from '../../models/BaseEntity';

/*
use of interfaces because the data models in FE dont have behavior
 */
export interface User extends BaseEntity {
  username: string;
  password: string;
  /**
   * In Backend as isAdmin and isBanned but shown as admin and banned in json tested with postman
   */
  admin: boolean;
  banned: boolean;
  id: number;
}
/*export class User extends BaseEntity {
  public username: string;
  public password: string;
  public isAdmin: boolean;
  /*public set username(username: string) {
    this._username = username;
  }
  public get username(): string {
    return this._username;
  }
  public set password(password: string) {
    this._password = password;
  }
  public get password(): string {
    return this._password;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  public get isAdmin(): boolean {
    return this._isAdmin;
  }
}*/
