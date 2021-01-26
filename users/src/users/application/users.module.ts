import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../domain/entities/user.entity';
import {
  MongoRepository,
  UserSchema,
} from '../infrastructure/repository/mongo.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, MongoRepository],
})
export class UsersModule {}
