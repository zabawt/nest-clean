import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  InternalServerErrorException,
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

import { CreateContractCommand } from './commands/create-contract.command';
import { ContractIdDto } from './dto/contract-id';
import { CreateContractDto } from './dto/create-contract';
import { GetContractQuery } from './queries/get-contract.query';
import { GetContractsQuery } from './queries/get-contracts.query';
import { JwtAuthGuard } from './guards/jwt.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ContractDto } from './dto/contract.dto';

@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
@ApiTags('Contracts')
@Controller('contracts')
@UseGuards(JwtAuthGuard)
export class ContractController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async createContract(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractIdDto> {
    try {
      const contractIdDto: ContractIdDto = await this.commandBus.execute(
        new CreateContractCommand(createContractDto),
      );
      return contractIdDto;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  async getContract(@Param('id') id: string): Promise<ContractDto> {
    const contract = await this.queryBus.execute(new GetContractQuery(id));
    if (!contract) {
      throw new NotFoundException();
    }
    return contract;
  }

  @Get()
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  async getContracts(): Promise<ContractDto[]> {
    return await this.queryBus.execute(new GetContractsQuery());
  }
}
