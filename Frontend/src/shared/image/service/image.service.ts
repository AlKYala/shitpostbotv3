import {BaseService} from '../../services/base.service';
import {Image} from '../model/Image';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Template} from '../../template/model/Template';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements BaseService<Image> {
  private imageUrl = `${environment.api}/images`;

  constructor(private httpClient: HttpClient) {
  }

  public findById(id: number): Observable<Image> {
    return this.httpClient.get(`${this.imageUrl}/${id}`) as Observable<Image>;
  }

  public findAll(): Observable<Image[]> {
    return this.httpClient.get(this.imageUrl) as Observable<Image[]>;
  }

  public create(image: Image): Observable<Image> {
    return this.httpClient.post(`${this.imageUrl}`, image) as Observable<Image>;
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete(`${this.imageUrl}/${id}`) as Observable<number>;
  }

  public update(image: Image): Observable<Image> {
    return this.httpClient.put(`${this.imageUrl}/${image.id}`, image) as Observable<Image>;
  }
  public findRandom(): Observable<Image> {
    return this.httpClient.get(`${this.imageUrl}/random`) as Observable<Image>;
  }

  public getCount(): Observable<number> {
    return this.httpClient.get(`${this.imageUrl}/count`) as Observable<number>;
  }
}
