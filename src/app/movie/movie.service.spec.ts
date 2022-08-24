import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { createdMovie, createMovieBody } from './mocks/createMovie.mock';
import { findMovie } from './mocks/findMovie.mock';
import { updatedMovie, updateMovieBody } from './mocks/updatedMovie.mock';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn().mockReturnValue(createdMovie),
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(findMovie),
            findOneByOrFail: jest.fn().mockResolvedValue(findMovie[0]),
            merge: jest.fn().mockReturnValue(updatedMovie),
            softDelete: jest
              .fn()
              .mockResolvedValue({ affected: 1 } as ObjectLiteral),
          },
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  describe('Save', () => {
    it('should save a new movie with success', async () => {
      jest.spyOn(movieRepository, 'save').mockResolvedValueOnce(createdMovie);
      const result = await movieService.save(createMovieBody);
      expect(result).toBeDefined();
      expect(movieRepository.create).toBeCalledTimes(1);
      expect(movieRepository.create).toBeCalledWith(createMovieBody);
      expect(movieRepository.save).toBeCalledTimes(1);
      expect(movieRepository.save).toBeCalledWith(createdMovie);
    });
  });

  describe('Find', () => {
    it('should return an array with movies', async () => {
      const result = await movieService.find();
      expect(result).toBeDefined();
      expect(movieRepository.find).toBeCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('should return a movie', async () => {
      const result = await movieService.findOne('abc34');
      expect(result).toBeDefined();
      expect(movieRepository.findOneByOrFail).toBeCalledTimes(1);
      expect(movieRepository.findOneByOrFail).toBeCalledWith({ id: 'abc34' });
    });
  });

  describe('Update', () => {
    it('should update a movie sucessfully', async () => {
      jest.spyOn(movieRepository, 'save').mockResolvedValue(updatedMovie);
      const result = await movieService.update('abc34', updateMovieBody);
      expect(result).toBeDefined();
      expect(movieRepository.findOneByOrFail).toBeCalledTimes(1);
      expect(movieRepository.findOneByOrFail).toBeCalledWith({ id: 'abc34' });
      expect(movieRepository.merge).toBeCalledTimes(1);
      expect(movieRepository.merge).toBeCalledWith(
        createdMovie,
        updateMovieBody,
      );
      expect(movieRepository.save).toBeCalledTimes(1);
      expect(movieRepository.save).toBeCalledWith(updatedMovie);
    });
  });

  describe('Delete', () => {
    it('should delete a movie successfully', async () => {
      const result = await movieService.delete('abc34');
      expect(result).toBeUndefined();
      expect(movieRepository.softDelete).toBeCalledTimes(1);
      expect(movieRepository.softDelete).toBeCalledWith('abc34');
    });

    it('should return an exception', async () => {
      jest
        .spyOn(movieRepository, 'softDelete')
        .mockRejectedValueOnce(new NotFoundException());
      expect(movieService.delete('abc34')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
