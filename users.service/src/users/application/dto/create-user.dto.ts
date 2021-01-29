export class CreateUserDto {
  constructor(
    public login: string,
    public password: string,
    public role: 'Admin' | 'User',
    public email: string,
    public first_name: string,
    public last_name: string,
  ) {}
}
