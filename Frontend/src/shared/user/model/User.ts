import {BaseEntity} from '../../models/BaseEntity';

export class User extends BaseEntity {
  public username: string;
  public password: string;
  public isAdmin: boolean;
}
