import {BaseEntity} from '../../models/BaseEntity';
import {Coordinate} from '../../coordinate/model/Coordinate';
import {User} from '../../user/model/User';

export class Template extends BaseEntity {
  private _poster: User;
  private _baseUrl: string;

  public set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set poster(poster: User){
    this._poster = poster;
  }
  public get poster(): User {
    return this._poster;
  }
}
