import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    save(body: CreateUserDto): Promise<Partial<User>>;
    find(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    udpate(id: string, body: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}
