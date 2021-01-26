import {
  Body,
  Controller,
  Get,
  NotFoundException,
  BadRequestException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateContractCommand } from './Commands/create-contract/create-contract.command';
import { ContractIdDto } from './DTO/contractId.dto';
import { NewContractDTO } from './DTO/newContract.dto';
import { GetContractQuery } from './Queries/get-contract.query';
import { GetContractsQuery } from './Queries/get-contracts.query';

@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
@ApiTags('Contracts')
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  async createContract(
    @Body() newContractDto: NewContractDTO,
  ): Promise<ContractIdDto> {
    try {
      const contractId: ContractIdDto = await this.commandBus.execute(
        new CreateContractCommand(newContractDto),
      );
      return contractId;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  async getContract(@Param('id') id: string) {
    const contract = await this.queryBus.execute(new GetContractQuery(id));
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  @Get()
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  async getContracts() {
    return await this.queryBus.execute(new GetContractsQuery());
  }
}
