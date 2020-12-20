import {Injectable} from '@angular/core';
import {User} from '../user/model/User';
import jwt_decode from 'jwt-decode';

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
    this.setCurrentUserUsername(user);
    this.setAdminState(user);
  }
  public getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }
  public setCurrentUserUsername(user: User): void {
    // niemand ist eingeloggt...
    if (user == null) {
      throw new Error('No user saved, cannot retrieve Username');
    }
    localStorage.setItem('currentUserUsername', user.username);
    this.localStorageKeys.push('currentUserUsername');
    this.logoutStorageKeys.push('currentUserUsername');
  }
  public getCurrentUserUsername(): string {
    return localStorage.getItem('currentUserUsername');
  }
  public setAdminState(user: User): void {
    localStorage.setItem('isAdmin', String(user.isAdmin));
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
    // mass logout
    for (const key of this.logoutStorageKeys) {
      localStorage.removeItem(key);
    }
    this.logoutStorageKeys = [];
  }
}
