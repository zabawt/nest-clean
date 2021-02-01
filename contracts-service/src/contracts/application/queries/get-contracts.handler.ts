import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { MongoRepository } from '../../infrastructure/repositories/contract/mongo.repository';
import { ContractDto } from '../dto/contract.dto';
import { SignatoryDto } from '../dto/signatory.dto';
import { ValidityPeriodDto } from '../dto/validity-period';
import { GetContractsQuery } from './get-contracts.query';

@QueryHandler(GetContractsQuery)
export class GetContractsHandler implements IQueryHandler<GetContractsQuery> {
  constructor(private readonly repository: MongoRepository) {}

  async execute() {
    const contracts = await this.repository.findAll();

    return contracts.map(
      ({ id, userId, created, updated, validFrom, validTo }) =>
        new ContractDto(
          id,
          created,
          updated,
          new ValidityPeriodDto(validFrom, validTo),
          new SignatoryDto(userId),
        ),
    );
  }
}
