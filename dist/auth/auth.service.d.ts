import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../app/users/users.service';
import { User } from '../app/users/users.entity';
export declare class AuthService {
    private readonly service;
    private readonly jwtService;
    constructor(service: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: {
        id: string;
    }): Promise<{
        token: string;
    }>;
}
