import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MongoRepository } from '../../infrastructure/repositories/contract/mongo.repository';
import { ContractDto } from '../dto/contract.dto';
import { SignatoryDto } from '../dto/signatory.dto';
import { ValidityPeriodDto } from '../dto/validity-period';
import { GetContractsForUserQuery } from './get-contracts-for-user.query';

@QueryHandler(GetContractsForUserQuery)
export class GetContractsForUserHandler
  implements IQueryHandler<GetContractsForUserQuery> {
  constructor(private readonly repository: MongoRepository) {}

  async execute(query: GetContractsForUserQuery): Promise<ContractDto[]> {
    const dbQuery = { userId: query.userId };
    const contracts = await this.repository.findBy(dbQuery);

    return contracts.map(
      (contract) =>
        new ContractDto(
          contract.id,
          contract.created,
          contract.updated,
          new ValidityPeriodDto(contract.validFrom, contract.validTo),
          new SignatoryDto(contract.userId),
        ),
    );
  }
}
