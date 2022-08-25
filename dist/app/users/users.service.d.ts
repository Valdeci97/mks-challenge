import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './users.entity';
export declare class UsersService {
    private readonly repository;
    constructor(repository: Repository<User>);
    save(user: CreateUserDto): Promise<User>;
    find(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, user: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
    findByEmail(email: string): Promise<User>;
}
