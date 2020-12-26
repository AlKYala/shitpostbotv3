import {BaseEntity} from '../../models/BaseEntity';
import {User} from '../../user/model/User';

export class Image extends BaseEntity {
  private _url: string;
  private _poster: User;
  public set url(url: string) {
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
}
