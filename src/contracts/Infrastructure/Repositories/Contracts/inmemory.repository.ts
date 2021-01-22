import { Injectable } from '@nestjs/common';
import { Contract } from '../../../Domain/Entities/contract.entity';
import { ContractRepository } from '../../../Domain/Repositories/contract.repository';

@Injectable()
export class InMemoryRepository implements ContractRepository {
  private contracts: Contract[] = require('./../../../../../seed/data.json');

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
