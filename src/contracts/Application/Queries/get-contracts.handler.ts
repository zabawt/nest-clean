import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MongoRepository } from 'src/contracts/Infrastructure/Repositories/Contracts/mongo.repository';
import { GetContractsQuery } from './get-contracts.query';

@QueryHandler(GetContractsQuery)
export class GetContractsHandler implements IQueryHandler<GetContractsQuery> {
  constructor(private readonly repository: MongoRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
