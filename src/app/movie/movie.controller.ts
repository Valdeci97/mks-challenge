import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Post()
  async save(@Body() body: SaveMovieDto): Promise<Movie> {
    return this.service.save(body);
  }

  @Get()
  async find(): Promise<Movie[]> {
    return this.service.find();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Movie> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async udpate(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateMovieDto,
  ): Promise<Movie> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.delete(id);
  }
}
