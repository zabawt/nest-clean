import { Contract } from '../Entities/contract.entity';

export interface ContractRepository {
  find(id: string): Promise<Contract>;
  findAll(): Promise<Contract[]>;
  save(contract: Contract): void;
}
