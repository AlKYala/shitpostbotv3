import {Observable} from 'rxjs';
import {BaseEntity} from '../models/BaseEntity';

/**
This interface is the interface for all services for models
 */
export interface BaseService<E extends BaseEntity> {
  findById(id: number): Observable<E>;
  findAll(): Observable<E[]>;
  create(baseEntity: BaseEntity): Observable<E>;
  delete(id: number): Observable<number>;
  update(baseEntity: BaseEntity): Observable<E>;
}
