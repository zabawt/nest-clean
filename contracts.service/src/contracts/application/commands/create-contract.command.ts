import { CreateContractDto } from '../dto/create-contract';

export class CreateContractCommand {
  constructor(public newContractDto: CreateContractDto) {}
}
