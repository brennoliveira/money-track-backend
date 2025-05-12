import { NextFunction, Request, Response } from "express";
import { JWTService } from "../Util";
import { UnauthorizedError } from "../Errors";

const jwtService = new JWTService();

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedError("Access denied: No Authorization header provided.");
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new UnauthorizedError("Access denied: No token provided.");
    }

    const decoded = jwtService.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError("Invalid or expired token."));
    }
  }
}
