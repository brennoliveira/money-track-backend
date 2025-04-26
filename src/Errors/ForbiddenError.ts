import { AppError } from "../Utils";

export class ForbiddenError extends AppError {
  constructor(message = "Access Denied") {
    super(message, 403);
  }
}