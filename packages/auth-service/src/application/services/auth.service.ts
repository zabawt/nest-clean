import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { SignInUserDto } from '../dto/sign-in-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  validateCredentials(
    signInUserDto: SignInUserDto,
  ): Observable<AxiosResponse<UserDto>> {
    const url = this.configService.get<string>('USERS_SERVICE_URL');
    const apiKey = this.configService.get<string>('USERS_API_KEY');

    const userDto = this.httpService.post(`${url}`, signInUserDto, {
      headers: { 'x-api-key': apiKey },
    });
    return userDto;
  }

  async login(user: UserDto) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
