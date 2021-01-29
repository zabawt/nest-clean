import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SignatoryDto {
  @ApiProperty()
  @IsUUID(4)
  public id: string;
  constructor(id: string) {
    this.id = id;
  }
}
