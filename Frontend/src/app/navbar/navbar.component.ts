import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/user/model/User';
import jwtDecode from 'jwt-decode';
import {UserToken} from '../../shared/interfaces/UserToken';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {Local} from 'protractor/built/driverProviders';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../shared/user/service/user.service';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  public username: string;
  public user: User;
  public subscriptions: Subscription[];

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly userService: UserService,
              private readonly authenticationService: AuthenticationService,
              private readonly toastrService: ToastrService,
              private router: Router,
              private readonly subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.initUser();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private checkIsLoggedIn(): boolean {
    return (this.username != null);
  }
  public initUser(): void {
    this.username = this.localStorageService.getCurrentUsername();
    const subscription = this.userService.findByUsername(this.username).pipe().subscribe((user: User) => {
      this.user = user;
    });
    this.subscriptions.push(subscription);
    this.isLoggedIn = this.checkIsLoggedIn();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.initUser();
    this.router.navigate(['/']);
    this.toastrService.success('Logout successful');
  }
}
