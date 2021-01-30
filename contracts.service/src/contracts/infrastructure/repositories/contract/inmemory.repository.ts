import { Injectable } from '@nestjs/common';
import { Contract } from '../../../domain/Entities/contract.entity';
import { ContractRepository } from '../../../domain/repositories/contract.repository';

@Injectable()
export class InMemoryRepository implements ContractRepository {
  private contracts: Contract[] = require('./../../../../../../mongo-seed/contracts.json');

  async find(id: string): Promise<Contract> {
    return this.contracts.find((contract) => contract.id === id);
  }

  async findAll(): Promise<Contract[]> {
    return this.contracts;
  }

  save(contract: Contract): void {
    this.contracts.push(contract);
  }
}
