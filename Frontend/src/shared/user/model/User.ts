import {BaseEntity} from '../../models/BaseEntity';

export class User extends BaseEntity {
  private username: string;
  private password: string;
  private isAdmin: boolean;

  public setUsername(username: string): void {
    this.username = username;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public setAdmin(value: boolean): void {
    this.isAdmin = value;
  }
  public checkIsAdmin(): boolean {
    return this.isAdmin;
  }
  public getUsername(): string {
    return this.username;
  }
  public getPassword(): string {
    return this.password;
  }
}
