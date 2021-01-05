import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user/model/User';
import jwtDecode from 'jwt-decode';
import {UserToken} from '../../shared/interfaces/UserToken';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {Local} from 'protractor/built/driverProviders';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../shared/user/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  public username: string;
  public user: User;

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly userService: UserService,
              private readonly authenticationService: AuthenticationService,
              private readonly toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.initUser();
  }
  private checkIsLoggedIn(): boolean {
    return (this.username != null);
  }
  public initUser(): void {
    this.username = this.localStorageService.getCurrentUsername();
    this.userService.findByUsername(this.username).pipe().subscribe((user: User) => {
      this.user = user;
    });
    this.isLoggedIn = this.checkIsLoggedIn();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.initUser();
    this.router.navigate(['/']);
    this.toastrService.success('Logout successful');
  }
}
