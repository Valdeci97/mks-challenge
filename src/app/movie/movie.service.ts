import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private readonly repository: Repository<Movie>,
  ) {}
  async save(movie: SaveMovieDto): Promise<Movie> {
    const createdMovie = this.repository.create(movie);
    await this.repository.save(createdMovie);
    return createdMovie;
  }

  async find(): Promise<Movie[]> {
    const movies = await this.repository.find();
    return movies;
  }

  async findOne(id: string) {
    try {
      const movie = await this.repository.findOneByOrFail({ id });
      return movie;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, movie: UpdateMovieDto) {
    try {
      const dbMovie = await this.repository.findOneByOrFail({ id });
      const updatedMovie = this.repository.merge(dbMovie, movie);
      return this.repository.save(updatedMovie);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async delete(id: string): Promise<void> {
    const movie = await this.repository.softDelete(id);
    if (!movie.affected) {
      throw new NotFoundException('there is no movie with such id');
    }
  }
}
