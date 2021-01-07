import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Shitpost} from '../model/shitpost';

@Injectable({
  providedIn: 'root'
})
export class ShitpostService {
  private shitPostUrl = `${environment.api}/templates/shitpost`;
  constructor(private readonly httpClient: HttpClient) {}
  public generateShitPost(templateID: number): Observable<Shitpost> {
    return this.httpClient.get(`${environment.api}/${templateID}`) as Observable<Shitpost>;
  }
}
