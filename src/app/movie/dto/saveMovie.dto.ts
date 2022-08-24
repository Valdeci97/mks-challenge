import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Max, Min, IsNumber } from 'class-validator';

export class SaveMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  director: string;

  @IsNotEmpty()
  @IsInt()
  @Max(2022)
  @Min(1895)
  @ApiProperty()
  releaseYear: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty()
  rating: number;
}
