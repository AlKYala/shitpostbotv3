import {BaseEntity} from '../../models/BaseEntity';
import {Template} from '../../template/model/Template';

export class Coordinate extends BaseEntity {
  private reference: Template;
  private x1: number;
  private x2: number;
  private y1: number;
  private y2: number;
}
