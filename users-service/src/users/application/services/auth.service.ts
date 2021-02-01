import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  public validate(apiKey: string): boolean {
    return this.configService.get<string>('API_KEY') === apiKey;
  }
}
