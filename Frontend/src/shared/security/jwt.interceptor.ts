import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {LocalStorageService} from '../services/localstorage.service';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService,
              private localStorageService: LocalStorageService) {
  }

  /**
   * Adds Authorization Header with the current user jwt key
   * @param request every request made
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.split('"')[3]}`
        }
      });
    }
    return next.handle(request);
  }
}
