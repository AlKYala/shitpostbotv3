import {BaseEntity} from '../../models/BaseEntity';
import {Template} from '../../template/model/Template';

export interface Coordinate extends BaseEntity {
  reference: Template;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/*export class Coordinate extends BaseEntity {
  public reference: Template;
  public x1: number;
  public x2: number;
  public y1: number;
  public y2: number;

  /*public get reference(): Template {
    return this._reference;
  }
  public set reference(reference: Template) {
    this._reference = reference;
  }
  public get x1(): number {
    return this._x1;
  }
  public set x1(x1: number) {
   this._x1 = x1;
  }
  public get x2(): number {
    return this._x2;
  }
  public set x2(x2: number) {
    this._x2 = x2;
  }
  public get y1(): number {
    return this._y1;
  }
  public set y1(y1: number) {
    this._y1 = y1;
  }
  public get y2(): number {
    return this._y1;
  }
  public set y2(y2: number) {
    this._y2 = y2;
  }
}*/
