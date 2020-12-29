import {BaseService} from '../../services/base.service';
import {Coordinate} from '../model/Coordinate';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from '../../user/model/User';

@Injectable({
  providedIn: 'root'
})
export class CoordinateService implements BaseService<Coordinate> {
  private coordinateUrl = `${environment.api}/coordinates`;

  constructor(private httpClient: HttpClient) {}

  public findById(id: number): Observable<Coordinate> {
    return this.httpClient.get(`${this.coordinateUrl}/${id}`) as Observable<Coordinate>;
  }

  public findAll(): Observable<Coordinate[]> {
    return this.httpClient.get(this.coordinateUrl) as Observable<Coordinate[]>;
  }

  public findByTemplate(templateId: number): Observable<Coordinate[]> {
    return this.findAll().pipe(map((coordinates: Coordinate[]) => {
      return coordinates.filter((coordinate: Coordinate) => coordinate.reference.id === templateId);
    }));
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
