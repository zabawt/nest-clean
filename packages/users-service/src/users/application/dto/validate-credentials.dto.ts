import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';

export class ValidateCredentialsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(5, 50)
  public readonly login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(5, 50)
  public readonly password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
