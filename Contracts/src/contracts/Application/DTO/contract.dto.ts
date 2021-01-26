import { SignatoryDTO } from './signatory.dto';
import { ValidityPeriodDTO } from './validityPeriod.dto';

export class ContractDTO {
  constructor(
    public id: string,
    public created: Date,
    public updated: Date,
    public validityPeriod: ValidityPeriodDTO,
    public signatory: SignatoryDTO,
  ) {}
}
