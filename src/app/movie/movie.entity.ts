import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  director: string;

  @Column('int', { name: 'release_year' })
  @ApiProperty()
  releaseYear: number;

  @Column('double precision')
  @ApiProperty()
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  constructor(movie?: Partial<Movie>) {
    this.id = movie?.id;
    this.name = movie?.name;
    this.director = movie?.director;
    this.releaseYear = movie?.releaseYear;
    this.rating = movie?.rating;
    this.createdAt = movie?.createdAt;
    this.updatedAt = movie?.updatedAt;
  }
}
