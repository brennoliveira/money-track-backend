import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../Models/types";

const secretKey = process.env.SECRET_KEY || "123456789";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    // Extrair o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied: No Authorization Header!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided!" });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Adicionar o payload decodificado na requisição
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
}
