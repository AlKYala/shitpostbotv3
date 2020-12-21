import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user/model/User';
import jwtDecode from 'jwt-decode';
import {UserToken} from '../../shared/interfaces/UserToken';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  public username: string;
  public user: string;

  constructor() { }

  ngOnInit(): void {
    this.initUser();
  }

  private checkIsLoggedIn(): boolean {
    return (this.username == null) ? false : true;
  }

  /**
   * violates SOLID principle
   */
  public initUser(): void {
    this.user = localStorage.getItem('currentUser');
    this.username = localStorage.getItem('currentUsername');
    this.isLoggedIn = this.checkIsLoggedIn();
  }
}
