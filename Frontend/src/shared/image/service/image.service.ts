import {BaseService} from '../../services/base.service';
import {Image} from '../model/Image';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements BaseService<Image> {
  private imageUrl = `${environment.api}/books`;

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
}
