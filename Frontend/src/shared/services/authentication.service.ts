import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../user/model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

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
                     private readonly router: Router) {
    //wipthis.currentUserSubject = new BehaviorSubject<User>()
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get tokenStringValue(): string {
    return this.tokenString;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.api}/authenticate`, {username, password})
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        this.isUserLoggedIn = true;
        return user;
      }));
  }

}
