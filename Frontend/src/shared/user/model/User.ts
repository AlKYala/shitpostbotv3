import {BaseEntity} from '../../models/BaseEntity';

export class User extends BaseEntity {
  private _username: string;
  private _password: string;
  private _isAdmin: boolean;

  public set username(username: string) {
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
}
