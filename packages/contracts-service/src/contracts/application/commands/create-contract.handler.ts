import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Contract } from '../../domain/entities/contract.entity';
import { MongoRepository } from '../../infrastructure/repositories/contract/mongo.repository';
import { ContractIdDto } from '../dto/contract-id';
import { MissingFromDate } from '../exceptions/missing-from-date.exception';
import { MissingUserId } from '../exceptions/missing-user-id.exception';
import { ContractDurationService } from '../services/contract-duration.service';
import { IdGeneratorService } from '../services/id-generator.service';
import { CreateContractCommand } from './create-contract.command';

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand> {
  constructor(private readonly repository: MongoRepository) {}

  async execute(command: CreateContractCommand): Promise<ContractIdDto> {
    const {
      newContractDto: { from, userId },
    } = command;

    if (!from) {
      throw new MissingFromDate();
    }

    if (!userId) {
      throw new MissingUserId();
    }

    const formDate: Date = new Date(from);
    const contractId = IdGeneratorService.getId();
    const endDate = ContractDurationService.getContractDuration(formDate);
    const createdDate = new Date();
    this.repository.save(
      new Contract(
        contractId,
        formDate,
        endDate,
        userId,
        createdDate,
        createdDate,
      ),
    );

    return new ContractIdDto(contractId);
  }
}
