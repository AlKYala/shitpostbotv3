import {BaseEntity} from '../../models/BaseEntity';
import {Coordinate} from '../../coordinate/model/Coordinate';
import {User} from '../../user/model/User';

export class Template extends BaseEntity {
  private poster: User;
  private baseUrl: string;
  public setUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
  public setPoster(poster: User): void {
    this.poster = poster;
  }
  public getPoster(): User {
    return this.poster;
  }
  public getUrl(): string {
    return this.baseUrl;
  }
}
