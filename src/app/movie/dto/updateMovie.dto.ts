import { PartialType } from '@nestjs/swagger';
import { SaveMovieDto } from './saveMovie.dto';

export class UpdateMovieDto extends PartialType(SaveMovieDto) {}
