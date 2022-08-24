import { UpdateMovieDto } from '../dto/updateMovie.dto';
import { Movie } from '../movie.entity';

export const updateMovieBody: UpdateMovieDto = {
  rating: 3.3,
};

export const updatedMovie: Movie = {
  id: 'abc34',
  name: '2012',
  director: 'Roland Emmerich',
  releaseYear: 2009,
  rating: updateMovieBody.rating,
  createdAt: '2022-08-22T21:25:05',
  updatedAt: '2022-08-23T21:25:06',
};
