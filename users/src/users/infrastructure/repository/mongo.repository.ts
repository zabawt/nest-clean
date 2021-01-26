import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/users/domain/repository/user.repository';
import { User } from '../../domain/entities/user.entity';

export const UserSchema = new mongoose.Schema({
  id: String,
  login: String,
  password: String,
  role: String,
  email: String,
  first_name: String,
  last_name: String,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UserDocument = User & mongoose.Document;

@Injectable()
export class MongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(id: string): Promise<User> {
    const userDocument = await this.userModel.findOne({ id: id });
    if (!userDocument) throw new Error(`Record with ${id} not found.`);
    return new User(
      userDocument.id,
      userDocument.login,
      userDocument.password,
      userDocument.role,
      userDocument.email,
      userDocument.first_name,
      userDocument.last_name,
    );
  }

  async findAll(): Promise<User[]> {
    const userDocuments = await this.userModel.find();

    const users = userDocuments.map((userDocument) => {
      return new User(
        userDocument.id,
        userDocument.login,
        userDocument.password,
        userDocument.role,
        userDocument.email,
        userDocument.first_name,
        userDocument.last_name,
      );
    });

    return users;
  }

  async save(user: User): Promise<void> {
    const created = new this.userModel(user);
    created.save();
  }
}
