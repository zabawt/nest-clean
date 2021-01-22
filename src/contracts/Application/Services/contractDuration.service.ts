import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractDurationService {
  public static getContractDuration(from: Date) {
    const endDate = new Date();
    endDate.setFullYear(from.getFullYear() + 1);
    return endDate;
  }
}
