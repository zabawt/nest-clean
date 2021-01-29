import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContractIdDto } from 'src/contracts/application/dto/contract-id';
import { ContractDurationService } from 'src/contracts/application/services/contract-duration.service';
import { IdGeneratorService } from 'src/contracts/application/services/id-generator.service';
import { MissingUserId } from 'src/contracts/application/exceptions/missing-user-id.exception';
import { CreateContractCommand } from './create-contract.command';
import { Contract } from 'src/contracts/domain/Entities/contract.entity';
import { MongoRepository } from 'src/contracts/infrastructure/repositories/contract/mongo.repository';
import { MissingFromDate } from 'src/contracts/application/exceptions/missing-from-date.exception';

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
