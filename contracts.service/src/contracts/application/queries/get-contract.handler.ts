import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Contract } from 'src/contracts/domain/Entities/contract.entity';
import { MongoRepository } from 'src/contracts/infrastructure/repositories/contract/mongo.repository';
import { ContractDto } from '../dto/contract.dto';
import { SignatoryDto } from '../DTO/signatory.dto';
import { ValidityPeriodDto } from '../DTO/validity-period';
import { GetContractQuery } from './get-contract.query';

@QueryHandler(GetContractQuery)
export class GetContractHandler implements IQueryHandler<GetContractQuery> {
  constructor(private readonly repository: MongoRepository) {}

  async execute(query: GetContractQuery) {
    const {
      id,
      userId,
      created,
      updated,
      validFrom,
      validTo,
    }: Contract = await this.repository.find(query.id);

    return new ContractDto(
      id,
      created,
      updated,
      new ValidityPeriodDto(validFrom, validTo),
      new SignatoryDto(userId),
    );
  }
}
