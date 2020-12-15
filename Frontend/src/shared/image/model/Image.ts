import {BaseEntity} from '../../models/BaseEntity';
import {User} from '../../user/model/User';

export class Image extends BaseEntity {
  public url: string;
  public poster: User;
}
