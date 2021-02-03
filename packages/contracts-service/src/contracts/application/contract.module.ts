import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger, Module } from '@nestjs/common';
import { Contract } from '../domain/entities/contract.entity';
import {
  ContractSchema,
  MongoRepository,
} from '../infrastructure/repositories/contract/mongo.repository';
import { CreateContractCommand } from './commands/create-contract.command';
import { CreateContractHandler } from './commands/create-contract.handler';
import { ContractController } from './contract.controller';
import { GetContractHandler } from './queries/get-contract.handler';
import { GetContractQuery } from './queries/get-contract.query';
import { GetContractsHandler } from './queries/get-contracts.handler';
import { GetContractsQuery } from './queries/get-contracts.query';
import { ContractDurationService } from './services/contract-duration.service';
import { IdGeneratorService } from './services/id-generator.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GetContractsForUserHandler } from './queries/get-contracts-for-user.handler';
import { GetContractsForUserQuery } from './queries/get-contracts-for-user.query';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema, collection: 'Contracts' },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ContractController],
  providers: [
    CreateContractCommand,
    CreateContractHandler,
    GetContractsQuery,
    GetContractsHandler,
    GetContractHandler,
    GetContractQuery,
    MongoRepository,
    Logger,
    IdGeneratorService,
    ContractDurationService,
    JwtStrategy,
    GetContractsForUserQuery,
    GetContractsForUserHandler,
  ],
})
export class ContractModule {}
