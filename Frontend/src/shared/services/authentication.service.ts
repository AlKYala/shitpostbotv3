import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../user/model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {LocalStorageService} from './localstorage.service';
import jwtDecode from 'jwt-decode';
import {UserToken} from '../interfaces/UserToken';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private tokenString: string;
  private isUserLoggedIn: boolean;


  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public constructor(private readonly httpClient: HttpClient,
                     private readonly router: Router,
                     private readonly localStorageService: LocalStorageService,
                     private readonly toastrService: ToastrService) {
    this.currentUserSubject =
      new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get tokenStringValue(): string {
    return this.tokenString;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/authenticate`, {username, password})
      .pipe(map(user => {
        const currentUser: UserToken = jwtDecode<UserToken>(user.jwt);
        if (currentUser.isBanned) {
          this.toastrService.warning("Your account is banned.");
          return null;
        }
        this.localStorageService.setCurrentUser(user);
        this.localStorageService.setCurrentUsername(currentUser.sub);
        this.localStorageService.setAdminState(currentUser.isAdmin);
        this.currentUserSubject.next(user);
        this.isUserLoggedIn = true;
        return user;
      }));
  }

  public logout(): void {
    this.localStorageService.removeAllLogoutKeys();
    this.currentUserSubject.next(null);
    this.isUserLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
  public isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}
