import { Action } from "redux";

export class Base implements Action {
  public type: string;
  public payload: any;

  constructor() {
    this.type = undefined!;
    this.payload = undefined!;
  }
}

export default Base;
