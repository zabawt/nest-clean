import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public login: string;
  @ApiProperty()
  public role: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public first_name: string;
  @ApiProperty()
  public last_name: string;

  constructor(
    id: string,
    login: string,
    role: string,
    email: string,
    first_name: string,
    last_name: string,
  ) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.login = login;
    this.role = role;
  }
}
