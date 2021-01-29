import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @Length(5, 50)
  public readonly login: string;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @Length(5, 50)
  public readonly password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
