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
import { SwaggerMovie } from '../swagger/movie.swagger';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Movies')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Post()
  @ApiOperation({ summary: 'Create new movie.' })
  @ApiResponse({
    status: 201,
    description: 'Movie has been successfully created',
    type: SwaggerMovie,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async save(@Body() body: SaveMovieDto): Promise<Movie> {
    return this.service.save(body);
  }

  @Get()
  @ApiOperation({ summary: 'Returns an array with all movies.' })
  @ApiResponse({
    status: 200,
    description: 'Request OK.',
    type: SwaggerMovie,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async find(): Promise<Movie[]> {
    return this.service.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns movie information by id.' })
  @ApiResponse({ status: 200, description: 'Request OK.', type: SwaggerMovie })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no movie with such id.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Movie> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie information by id.' })
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully.',
    type: SwaggerMovie,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no movie with such id.',
    type: NotFoundSwagger,
  })
  async udpate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateMovieDto,
  ): Promise<Movie> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a movie by id.' })
  @ApiResponse({ status: 204, description: 'Movie deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'There is no movie with such id.',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
