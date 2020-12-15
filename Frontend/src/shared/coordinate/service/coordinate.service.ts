import {BaseService} from '../../services/base.service';
import {Coordinate} from '../model/Coordinate';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService implements BaseService<Coordinate> {
  private coordinateUrl = `${environment.api}/copies`;

  constructor(private httpClient: HttpClient) {}

  public findById(id: number): Observable<Coordinate> {
    return this.httpClient.get(`${this.coordinateUrl}/${id}`) as Observable<Coordinate>;
  }

  public findAll(): Observable<Coordinate[]> {
    return this.httpClient.get(this.coordinateUrl) as Observable<Coordinate[]>;
  }

  public create(coordinate: Coordinate): Observable<Coordinate> {
    return this.httpClient.post(`${this.coordinateUrl}`, coordinate) as Observable<Coordinate>;
  }

  public delete(id: number): Observable<number> {
    return this.httpClient.delete(`${this.coordinateUrl}/${id}`) as Observable<number>;
  }

  public update(coordinate: Coordinate): Observable<Coordinate> {
    return this.httpClient.put(`${this.coordinateUrl}/${coordinate.id}`, coordinate) as Observable<Coordinate>;
  }
}
