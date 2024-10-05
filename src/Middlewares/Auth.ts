import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from '../Models/types';

const secretKey = process.env.SECRET_KEY || '';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
}