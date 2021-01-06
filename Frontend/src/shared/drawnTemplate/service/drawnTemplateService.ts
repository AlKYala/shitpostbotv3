import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DrawnTemplate} from '../model/drawnTemplate';

@Injectable({
  providedIn: 'root'
})
export class DrawnTemplateService {
  private drawnTemplateUrl = `${environment.api}/templates/draw`;
  constructor(private readonly httpClient: HttpClient) {
  }
  public findDrawnTemplate(id: number): Observable<DrawnTemplate> {
    return this.httpClient.get(`${this.drawnTemplateUrl}/${id}`) as Observable<DrawnTemplate>;
  }
}
