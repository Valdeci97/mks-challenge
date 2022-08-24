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
}
