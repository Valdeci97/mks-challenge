import { Repository } from 'typeorm';
import { SaveMovieDto } from './dto/saveMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';
export declare class MovieService {
    private readonly repository;
    constructor(repository: Repository<Movie>);
    save(movie: SaveMovieDto): Promise<Movie>;
    find(): Promise<Movie[]>;
    findOne(id: string): Promise<Movie>;
    update(id: string, movie: UpdateMovieDto): Promise<Movie>;
    delete(id: string): Promise<void>;
}
