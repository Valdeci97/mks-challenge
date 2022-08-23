import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async save(user: CreateUserDto): Promise<User> {
    const createdUser = this.repository.create(user);
    await this.repository.save(createdUser);
    return createdUser;
  }
  async find(): Promise<User[]> {
    const users = await this.repository.find({
      select: ['id', 'name', 'email', 'createdAt'],
    });
    return users;
  }
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.repository.findOneByOrFail({ id });
      return user;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async update(id: string, user: UpdateUserDto): Promise<User> {
    try {
      const dbUser = await this.repository.findOneByOrFail({ id });
      const updatedUser = this.repository.merge(dbUser, user);
      return this.repository.save(updatedUser);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async delete(id: string): Promise<void> {
    const user = await this.repository.softDelete(id);
    if (!user.affected) {
      throw new NotFoundException('there is no user with such id');
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
