import { ApiProperty } from '@nestjs/swagger';

export class NewContractDTO {
  @ApiProperty()
  public from: Date;

  @ApiProperty()
  public userId: number;

  constructor(from: Date, userId: number) {
    this.userId = userId;
    this.from = from;
  }
}
