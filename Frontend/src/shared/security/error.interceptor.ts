import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly toastrService: ToastrService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err =>{
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload(true);
      }
      else if (err.status === 403 && this.authenticationService.isLoggedIn()) {
        location.reload(true);
        this.toastrService.error('Fehler aufgetreten');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
