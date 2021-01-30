import { IsString, IsAlphanumeric, Length } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsAlphanumeric()
  @Length(5, 50)
  public login: string;

  @IsString()
  @IsAlphanumeric()
  @Length(5, 50)
  public password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
