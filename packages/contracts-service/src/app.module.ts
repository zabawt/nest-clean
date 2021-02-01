import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractModule } from './contracts/application/contract.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    ContractModule,
  ],
  exports: [ConfigModule],
})
export class AppModule {}
