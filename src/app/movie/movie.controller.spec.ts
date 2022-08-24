import { Test, TestingModule } from '@nestjs/testing';
import { createdMovie, createMovieBody } from './mocks/createMovie.mock';
import { findMovie } from './mocks/findMovie.mock';
import { updateMovieBody } from './mocks/updatedMovie.mock';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(findMovie),
            findOne: jest.fn().mockResolvedValue(findMovie[0]),
            update: jest.fn().mockResolvedValue(updateMovieBody),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
    expect(movieService).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new movie with success', async () => {
      jest.spyOn(movieService, 'save').mockResolvedValueOnce(createdMovie);
      const result = await movieController.save(createMovieBody);
      expect(result).toBeDefined();
      expect(movieService.save).toBeCalledTimes(1);
      expect(movieService.save).toBeCalledWith(createMovieBody);
    });
  });

  describe('Find', () => {
    it('should return an array with movies', async () => {
      const result = await movieController.find();
      expect(result).toBeDefined();
      expect(movieService.find).toBeCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('should return a movie', async () => {
      const result = await movieController.findOne('abc34');
      expect(result).toBeDefined();
      expect(movieService.findOne).toBeCalledTimes(1);
      expect(movieService.findOne).toBeCalledWith('abc34');
    });
  });

  describe('Update', () => {
    it('should updated a movie successfully', async () => {
      const result = await movieController.udpate('abc34', updateMovieBody);
      expect(result).toBeDefined();
      expect(movieService.update).toBeCalledTimes(1);
      expect(movieService.update).toBeCalledWith('abc34', updateMovieBody);
    });
  });

  describe('Delete', () => {
    it('should deleted a movie sucessfully', async () => {
      const result = await movieController.delete('abc34');
      expect(result).toBeUndefined();
      expect(movieService.delete).toBeCalledTimes(1);
      expect(movieService.delete).toBeCalledWith('abc34');
    });
  });
});
