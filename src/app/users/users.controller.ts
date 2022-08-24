import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../swagger/exceptions/badRequest.swagger';
import { NotFoundSwagger } from '../swagger/exceptions/notFound.swagger';
import { SwaggerUser } from '../swagger/user.swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Create new user.' })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created',
    type: SwaggerUser,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async save(@Body() body: CreateUserDto): Promise<Partial<User>> {
    const user = await this.service.save(body);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Returns an array with all users.' })
  @ApiResponse({
    status: 200,
    description: 'Request OK',
    type: SwaggerUser,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async find(): Promise<User[]> {
    return this.service.find();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Returns user information by id.' })
  @ApiResponse({
    status: 200,
    description: 'Request OK',
    type: SwaggerUser,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no use with such id',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update an user information by id.' })
  @ApiResponse({
    status: 200,
    description: 'Request OK',
    type: SwaggerUser,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no use with such id',
    type: NotFoundSwagger,
  })
  async udpate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete an user by id.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no use with such id',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
