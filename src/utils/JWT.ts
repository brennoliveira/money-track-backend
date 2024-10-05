import jwt from 'jsonwebtoken';

export class JWTService {
  private readonly SECRET_KEY = process.env.SECRET_KEY || '';

  generateToken(userId: number): string {
    const payload = { userId };
  
    const token = jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
  
    return token;
  }
}