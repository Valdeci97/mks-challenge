import { Test, TestingModule } from '@nestjs/testing';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new movie with success', async () => {
      const body: SaveMovieDto = {
        name: '2012',
        director: 'Roland Emmerich',
        releaseYear: 2009,
        rating: 3.2,
      };
      const movieMock = {
        name: '2012',
        director: 'Roland Emmerich',
        releaseYear: 2009,
        rating: 3.2,
      } as Movie;
      jest.spyOn(service, 'save').mockResolvedValueOnce(movieMock);
      const result = await service.save(body);
      expect(result).toBeDefined();
      expect(service.save).toBeCalledTimes(1);
    });
  });
});
