import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsDateString()
  public from: Date;

  @ApiProperty()
  @IsUUID(4)
  public userId: string;

  constructor(from: Date, userId: string) {
    this.userId = userId;
    this.from = from;
  }
}
