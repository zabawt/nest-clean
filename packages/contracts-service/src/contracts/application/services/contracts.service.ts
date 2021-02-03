import { Injectable, Logger } from '@nestjs/common';
import { Contract } from '../../domain/entities/contract.entity';
import { MongoRepository } from '../../infrastructure/repositories/contract/mongo.repository';

@Injectable()
export class ContractsService {
  constructor(
    private readonly repository: MongoRepository,
    private readonly logger: Logger,
  ) {}

  async find(id: string): Promise<Contract> {
    return this.repository.find(id);
  }
}
