import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MongoRepository } from '../../infrastructure/repository/mongo.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: MongoRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    try {
      return await this.repository.find(id);
    } catch (err) {
      throw new Error('User not found.');
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
