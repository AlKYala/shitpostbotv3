import {BaseEntity} from '../../models/BaseEntity';
import {Coordinate} from '../../coordinate/model/Coordinate';
import {User} from '../../user/model/User';

export class Template extends BaseEntity {
  private poster: User;
  private baseUrl: string;
}
