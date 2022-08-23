import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new movie with success', async () => {
      const movieMock = {
        name: '2012',
        director: 'Roland Emmerich',
        releaseYear: 2009,
        rating: 3.2,
      } as Movie;
      jest.spyOn(repository, 'create').mockReturnValueOnce(movieMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(movieMock);
      const movie: SaveMovieDto = {
        name: '2012',
        director: 'Roland Emmerich',
        releaseYear: 2009,
        rating: 3.2,
      };
      const result = await service.save(movie);
      expect(result).toBeDefined();
      expect(repository.save).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(1);
    });
  });
});
