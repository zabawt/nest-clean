import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../domain/entities/user.entity';
import {
  MongoRepository,
  UserSchema,
} from '../infrastructure/repository/mongo.repository';
import { ApiKeyMiddleware } from './middleware/api-key.middleware';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'Users' },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, MongoRepository, AuthService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('users');
  }
}
