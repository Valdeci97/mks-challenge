import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hash(this.password, 10);
  }
}
