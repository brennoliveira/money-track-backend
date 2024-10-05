import { JwtPayload } from "./Models/types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}