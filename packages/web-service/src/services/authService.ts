import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

export class AuthService {
  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, process.env.jwtSecret);
  }
  async getToken(request: NextApiRequest): Promise<string | null> {
    return request.cookies?.jwt;
  }
}
