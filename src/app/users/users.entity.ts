import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity({ name: 'users' })
export class User {
  private readonly hashSalts = 10;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @UpdateDateColumn({ name: 'created_at' })
  createdAt: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hash(this.password, this.hashSalts);
  }
}
