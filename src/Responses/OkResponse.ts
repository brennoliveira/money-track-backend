import { AppSuccess } from "../Utils";

export class OkResponse<T> extends AppSuccess<T>{
  constructor(data: T) {
    super(data, 200);
  }
}