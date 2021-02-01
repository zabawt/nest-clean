import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (
      typeof apiKey === 'string' &&
      this.authService.validate(apiKey as string)
    ) {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
