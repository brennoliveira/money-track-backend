import { AppError } from "../Util";

export class ForbiddenError extends AppError {
  constructor(message = "Access Denied") {
    super(message, 403);
  }
}