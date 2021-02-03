import {
  Controller,
  Post,
  UseGuards,
  Body,
  NotImplementedException,
  UnauthorizedException,
  Logger,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Post('sign-in')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) response: any,
  ) {
    return await this.authService
      .validateCredentials(signInUserDto)
      .toPromise()
      .then(async ({ data }) => {
        const token = await this.authService.login(data);

        response.cookie('jwt', token.access_token, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        });
        return token;
      })
      .catch((err: Error) => {
        this.logger.log(
          `Login attempt with ${signInUserDto.login} failed.`,
          err.message,
        );
        throw new UnauthorizedException();
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken() {
    throw new NotImplementedException();
  }
}
