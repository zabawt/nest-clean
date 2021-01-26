import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContractIdDto } from 'src/contracts/Application/DTO/contractId.dto';
import { ContractDurationService } from 'src/contracts/Application/Services/contractDuration.service';
import { IdGeneratorService } from 'src/contracts/Application/Services/idGenerator.service';
import { MissingUserId } from 'src/contracts/Domain/Exceptions/MissingUserId.exception';
import { CreateContractCommand } from './create-contract.command';
import { Contract } from 'src/contracts/Domain/Entities/contract.entity';
import { MongoRepository } from 'src/contracts/Infrastructure/Repositories/Contracts/mongo.repository';
import { MissingFromDate } from 'src/contracts/Domain/Exceptions/MissingFromDate.exception';

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
