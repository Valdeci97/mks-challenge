import { IsNotEmpty, IsInt, Max, Min, IsNumber } from 'class-validator';

export class SaveMovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  director: string;

  @IsNotEmpty()
  @IsInt()
  @Max(2022)
  @Min(1895)
  releaseYear: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
