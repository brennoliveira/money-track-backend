import jwt from 'jsonwebtoken';
import { JwtPayload } from '../Models/types';

class JWTService {
  private readonly SECRET_KEY = process.env.SECRET_KEY || '';

  generateToken(userId: number): string {
    const payload = { userId };
  
    const token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '24h' });
  
    return token;
  }

  verifyToken(token: string): JwtPayload {
    const decoded = jwt.verify(token, this.SECRET_KEY) as JwtPayload;

    return decoded;
  }
}

export default JWTService