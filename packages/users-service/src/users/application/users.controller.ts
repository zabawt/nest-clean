import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  NotImplementedException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateCredentialsDto } from './dto/validate-credentials.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiHeader({ name: 'x-api-key', description: 'Api key' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.find(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
  @Post('validate')
  @HttpCode(200)
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  async validateCredentials(
    @Body() validateCredentialsDto: ValidateCredentialsDto,
  ): Promise<UserDto> {
    try {
      return await this.usersService.findByCredentials(validateCredentialsDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   throw new NotImplementedException();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   throw new NotImplementedException();
  // }
}
