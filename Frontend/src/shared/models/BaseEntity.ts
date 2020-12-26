export abstract class BaseEntity {
  private _id: number;
  public set id(id: number) {
    this._id = id;
  }
  public get id(): number {
    return this._id;
  }
}
