import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MongoRepository } from '../../infrastructure/repository/mongo.repository';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';
import { ValidateCredentialsDto } from '../dto/validate-credentials.dto';
import { UserDto } from '../dto/user.dto';
import { ROLE } from '../enums/role.enum';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly repository: MongoRepository) {}

  private enumerateRole(role: string) {
    return ROLE[role.toUpperCase()];
  }

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.repository.findAll();
    return users.map(
      ({ id, login, role, email, first_name, last_name }) =>
        new UserDto(
          id,
          login,
          this.enumerateRole(role),
          email,
          first_name,
          last_name,
        ),
    );
  }

  async find(id: string): Promise<UserDto> {
    try {
      const {
        id: userId,
        login,
        role,
        email,
        first_name,
        last_name,
      } = await this.repository.find(id);
      return new UserDto(
        userId,
        login,
        this.enumerateRole(role),
        email,
        first_name,
        last_name,
      );
    } catch (err) {
      throw new UserNotFoundException();
    }
  }

  async findByCredentials(
    validateCredentialsDto: ValidateCredentialsDto,
  ): Promise<UserDto> {
    const {
      id,
      login,
      role,
      email,
      first_name,
      last_name,
    } = await this.repository.findBy(validateCredentialsDto);

    return new UserDto(
      id,
      login,
      this.enumerateRole(role),
      email,
      first_name,
      last_name,
    );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
