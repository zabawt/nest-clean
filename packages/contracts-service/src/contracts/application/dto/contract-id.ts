import { ApiProperty } from '@nestjs/swagger';

export class ContractIdDto {
  @ApiProperty()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
