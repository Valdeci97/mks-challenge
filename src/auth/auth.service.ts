import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { compare } from 'bcryptjs';
import { User } from 'src/app/users/users.entity';
import { JwtService } from '@nestjs/jwt';

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
