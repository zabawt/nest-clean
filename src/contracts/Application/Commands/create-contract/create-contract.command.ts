import { NewContractDTO } from '../../DTO/newContract.dto';

export class CreateContractCommand {
  constructor(public newContractDto: NewContractDTO) {}
}
