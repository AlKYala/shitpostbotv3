import {BaseEntity} from '../../models/BaseEntity';
import {User} from '../../user/model/User';

export class Image extends BaseEntity {
  private url: string;
  private poster: User;
  public setUrl(url: string): void {
    this.url = url;
  }
  public setPoster(poster: User): void {
    this.poster = poster;
  }
  public getPoster(): User {
    return this.poster;
  }
  public getUrl(): string {
    return this.url;
  }
}
