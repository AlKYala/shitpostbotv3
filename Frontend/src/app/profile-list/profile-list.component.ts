import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/user/service/user.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SubscriptionService} from '../../shared/services/subscription.service';
import {User} from '../../shared/user/model/User';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit, OnDestroy {

  public users: User[];
  public subscriptions: Subscription[];

  constructor(private readonly userService: UserService,
              private readonly localStorageService: LocalStorageService,
              private readonly toastrService: ToastrService,
              private readonly router: Router,
              private readonly subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
    this.subscriptions = [];
    this.checkIsUserAdmin();
    this.initUsers();
  }
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll(this.subscriptions);
  }
  private checkIsUserAdmin(): void {
    if (!this.localStorageService.getAdminState()) {
      this.toastrService.warning('Permission denied');
      this.router.navigate(['/']);
    }
  }
  private initUsers(): void {
    const subscription = this.userService.findAll()
      .pipe()
      .subscribe((users: User[]) => {
      this.users = users;
    });
    this.subscriptions.push(subscription);
  }

  public sortUsers(category?: ProfileCategory): void {
    if (category === undefined || category === 0) {
      this.users.sort((a: User, b: User) => a.username.localeCompare(b.username));
    }
    if (category === 1) {
      this.users.sort((a: User, b: User) => {
        return (a.isAdmin) ? 1 : -1;
      });
    }
  }

  debug(obj: any): void {
    console.log(obj);
  }

  public checkIsBanned(user: User): boolean {
    return user.isBanned;
  }
  public deleteUser(user: User): void {
    const subscription = this.userService.delete(user.id).pipe().subscribe( (data: number) => {
      this.toastrService.success(`User with ID ${data} deleted`);
      location.reload();
    });
    this.subscriptions.push(subscription);
  }
  public makeAdmin(user: User): void {
    user.isAdmin = true;
    const subscription = this.userService.update(user).pipe().subscribe(() => {
      this.toastrService.success(`User with ID ${user.username} promoted to admin`);
      location.reload();
    });
  }
  public takeAdmin(user: User): void {
    user.isAdmin = false;
    const subscription = this.userService.update(user).pipe().subscribe( () => {
      this.toastrService.success(`User with ID ${user.username} no longer admin`);
      location.reload();
    });
  }
}
enum ProfileCategory {
  username,
  isAdmin
}
