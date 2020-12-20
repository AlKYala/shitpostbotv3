import {Injectable} from '@angular/core';
import {User} from '../user/model/User';
import jwtDecode from 'jwt-decode';

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
  }
  public getCurrentUser(): string {
    return localStorage.getItem('currentUser');
  }
  public setCurrentUserUsername(): void {
    // niemand ist eingeloggt...
    if (this.getCurrentUser() == null) {
      throw new Error('No user saved, cannot retrieve Username');
    }
    localStorage.setItem('currentUserUsername', jwtDecode(this.getCurrentUser()).sub);
    this.localStorageKeys.push('currentUserUsername');
    this.logoutStorageKeys.push('currentUserUsername');
  }
  public getCurrentUserUsername(): string {
    return localStorage.getItem('currentUserUsername');
  }
  public setAdminState(): void {
    localStorage.setItem('isAdmin', jwtDecode(this.getCurrentUser()).isAdmin);
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
    //mass logout
    for (const key of this.logoutStorageKeys) {
      localStorage.removeItem(key);
    }
    this.logoutStorageKeys = [];
  }
}
