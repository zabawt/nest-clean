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

  async findAll() {
    console.error(await this.repository.findAll());
    return await this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.find(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
