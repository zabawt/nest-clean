import { IsUUID } from 'class-validator';

export class GetContractsForUserQuery {
  @IsUUID(4)
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}
