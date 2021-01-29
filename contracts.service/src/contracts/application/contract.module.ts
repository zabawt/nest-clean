import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract } from '../domain/Entities/contract.entity';
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
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema, collection: 'Contracts' },
    ]),
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
    IdGeneratorService,
    ContractDurationService,
    JwtStrategy,
  ],
})
export class ContractModule {}
