import {BaseService} from '../../services/base.service';
import {User} from '../model/User';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements BaseService<User> {
  private userUrl = `${environment.api}/users`;

  constructor(private httpClient: HttpClient) {
  }

  public findById(id: number): Observable<User> {
    return this.httpClient.get(`${this.userUrl}/${id}`) as Observable<User>;
  }

  public findAll(): Observable<User[]> {
    return this.httpClient.get(this.userUrl) as Observable<User[]>;
  }

  public create(user: User): Observable<User> {
    return this.httpClient.post(this.userUrl, user) as Observable<User>;
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete(`${this.userUrl}/${id}`) as Observable<number>;
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put(`${this.userUrl}/${user.id}`, user) as Observable<User>;
  }
}
