import {Template} from '../model/Template';
import {BaseService} from '../../services/base.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateService implements BaseService<Template> {

  private templateUrl = `${environment.api}/templates`;

  constructor(private httpClient: HttpClient) {
  }

  public findById(id: number): Observable<Template> {
    return this.httpClient.get(`${this.templateUrl}/${id}`) as Observable<Template>;
  }

  public findTemplateSquareImageById(id: number): Observable<any> {
    return this.httpClient.get(`${this.templateUrl}/draw/${id}`) as Observable<string>;
  }

  public findAll(): Observable<Template[]> {
    return this.httpClient.get(this.templateUrl) as Observable<Template[]>;
  }

  public create(template: Template): Observable<Template> {
    return this.httpClient.post(`${this.templateUrl}`, template) as Observable<Template>;
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete(`${this.templateUrl}/${id}`) as Observable<number>;
  }

  public update(template: Template): Observable<Template> {
    return this.httpClient.put(`${this.templateUrl}/${template.id}`, template) as Observable<Template>;
  }
  public getCount(): Observable<number> {
    return this.httpClient.get(`${this.templateUrl}/count`) as Observable<number>;
  }
}
