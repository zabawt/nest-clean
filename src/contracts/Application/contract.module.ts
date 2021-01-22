import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { InMemoryRepository } from 'src/contracts/Infrastructure/Repositories/Contracts/inmemory.repository';
import {
  ContractSchema,
  MongoRepository,
} from '../Infrastructure/Repositories/Contracts/mongo.repository';
import { CreateContractCommand } from './Commands/create-contract/create-contract.command';
import { CreateContractHandler } from './Commands/create-contract/create-contract.handler';
import { ContractController } from './contract.controller';
import { GetContractHandler } from './Queries/get-contract.handler';
import { GetContractQuery } from './Queries/get-contract.query';
import { GetContractsHandler } from './Queries/get-contracts.handler';
import { GetContractsQuery } from './Queries/get-contracts.query';
import { ContractDurationService } from './Services/contractDuration.service';
import { IdGeneratorService } from './Services/idGenerator.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Contract', schema: ContractSchema }]),
  ],
  controllers: [ContractController],
  providers: [
    CreateContractCommand,
    CreateContractHandler,
    GetContractsQuery,
    GetContractsHandler,
    GetContractHandler,
    GetContractQuery,
    InMemoryRepository,
    MongoRepository,
    IdGeneratorService,
    ContractDurationService,
  ],
})
export class ContractModule {}
