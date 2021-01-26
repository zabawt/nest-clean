import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/users/domain/repository/user.repository';
import { User } from '../../domain/entities/user.entity';

const UserSchemaInit = new mongoose.Schema();
export const UserSchema = UserSchemaInit.loadClass(User);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UserDocument = User & mongoose.Document;

@Injectable()
export class MongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(id: string): Promise<User> {
    const userDocument = await this.userModel.findOne({ id: id });

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
    const users = userDocuments.map(
      (user: UserDocument) =>
        new User(
          user.id,
          user.login,
          user.password,
          user.role,
          user.email,
          user.first_name,
          user.last_name,
        ),
    );
    return users;
  }

  async save(user: User): Promise<void> {
    throw new NotImplementedException();

    // const created = new this.contractModel(contract);
    // created.save();
  }
}
