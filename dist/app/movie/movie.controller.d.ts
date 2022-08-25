import { SaveMovieDto } from './dto/saveMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly service;
    constructor(service: MovieService);
    save(body: SaveMovieDto): Promise<Movie>;
    find(): Promise<Movie[]>;
    findOne(id: string): Promise<Movie>;
    udpate(id: string, body: UpdateMovieDto): Promise<Movie>;
    delete(id: string): Promise<void>;
}
