import {Injectable} from '@angular/core';
import {User} from '../user/model/User';
import jwt_decode from 'jwt-decode';
import {UserToken} from '../interfaces/UserToken';
import jwtDecode from 'jwt-decode';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKeys: string[];
  private logoutStorageKeys: string[];

  constructor() {
    this.localStorageKeys = [];
    this.logoutStorageKeys = [];
  }
  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.localStorageKeys.push('currentUser');
    this.logoutStorageKeys.push('currentUser');
    this.setCurrentUsername(user.username);
    this.setAdminState(user.isAdmin);
  }
  public getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }
  public setCurrentUsername(username: string): void {
    // niemand ist eingeloggt...
    if (this.getCurrentUser() == null) {
      throw new Error('No user saved, cannot retrieve Username');
    }
    localStorage.setItem('currentUsername', username);
    this.localStorageKeys.push('currentUsername');
    this.logoutStorageKeys.push('currentUsername');
  }
  public getCurrentUsername(): string {
    return localStorage.getItem('currentUsername');
  }
  public setAdminState(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', String(isAdmin));
    this.localStorageKeys.push('isAdmin');
    this.logoutStorageKeys.push('isAdmin');
  }
  public getAdminState(): boolean {
    if (localStorage.getItem('isAdmin') == null) {
      return false;
    }
    return (localStorage.getItem('isAdmin') === 'true');
  }
  public removeAllLogoutKeys(): void {
    for (const key in this.logoutStorageKeys) {
      localStorage.removeItem(key);
    }
    this.logoutStorageKeys = [];
  }
}
