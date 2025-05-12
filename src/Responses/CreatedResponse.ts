import { AppSuccess } from "../Util";

export class CreatedResponse<T> extends AppSuccess<T> {
  constructor(public readonly data: T) {
    super(data, 201);
  }
}
