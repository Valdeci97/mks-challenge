import { SaveMovieDto } from '../dto/saveMovie.dto';
import { Movie } from '../movie.entity';

export const createMovieBody: SaveMovieDto = {
  name: '2012',
  director: 'Roland Emmerich',
  releaseYear: 2009,
  rating: 3.2,
};

export const createdMovie: Movie = new Movie({
  id: 'abc34',
  ...createMovieBody,
  createdAt: '2022-08-22T21:25:05',
  updatedAt: '2022-08-23T21:25:06',
});
