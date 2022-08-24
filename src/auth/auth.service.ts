import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../app/users/users.service';
import { User } from '../app/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.service.findByEmail(email);
    if (!user) return null;
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) return null;
    return user;
  }

  async login(user: { id: string }) {
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
