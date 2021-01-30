import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Contract } from '../../domain/Entities/contract.entity';
import { MongoRepository } from '../../infrastructure/repositories/contract/mongo.repository';
import { ContractDto } from '../dto/contract.dto';
import { SignatoryDto } from '../dto/signatory.dto';
import { ValidityPeriodDto } from '../dto/validity-period';
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
