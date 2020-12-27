import {BaseEntity} from '../../models/BaseEntity';
import {User} from '../../user/model/User';

export interface Image extends BaseEntity {
  url: string;
  poster: User;
}

/*export class Image extends BaseEntity {
  public url: string;
  public poster: User;
  /*public set url(url: string) {
    this._url = url;
  }
  public get url(): string {
    return this._url;
  }
  public set poster(poster: User) {
    this._poster = poster;
  }
  public get poster(): User {
    return this._poster;
  }
}*/
