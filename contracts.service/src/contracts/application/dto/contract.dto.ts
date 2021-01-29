import { ApiProperty } from '@nestjs/swagger';
import { SignatoryDto } from './signatory.dto';
import { ValidityPeriodDto } from './validity-period';

export class ContractDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public created: Date;
  @ApiProperty()
  public updated: Date;
  @ApiProperty()
  public validityPeriod: ValidityPeriodDto;
  @ApiProperty()
  public signatory: SignatoryDto;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    validityPeriod: ValidityPeriodDto,
    signatory: SignatoryDto,
  ) {
    this.id = id;
    this.created = created;
    this.updated = updated;
    this.validityPeriod = validityPeriod;
    this.signatory = signatory;
  }
}
