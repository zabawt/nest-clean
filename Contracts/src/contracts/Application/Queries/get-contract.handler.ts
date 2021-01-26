import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MongoRepository } from 'src/contracts/Infrastructure/Repositories/Contracts/mongo.repository';
import { GetContractQuery } from './get-contract.query';

@QueryHandler(GetContractQuery)
export class GetContractHandler implements IQueryHandler<GetContractQuery> {
  constructor(private readonly repository: MongoRepository) {}

  async execute(query: GetContractQuery) {
    const contract = await this.repository.find(query.id);

    return contract;
  }
}
