import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractModule } from './contracts/Application/contract.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    ContractModule,
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client-app/out'),
    }),
  ],
})
export class AppModule {}
