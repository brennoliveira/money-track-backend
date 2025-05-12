import { AppSuccess } from "../Util";

export class OkResponse<T> extends AppSuccess<T>{
  constructor(data: T) {
    super(data, 200);
  }
}