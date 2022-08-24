import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../users.entity';

export const createUserBody: CreateUserDto = {
  name: 'usuário teste',
  email: 'user@test.com',
  password: 'Senhaforte123*',
};

export const createdUser: User = new User({
  id: 'abc34',
  ...createUserBody,
  createdAt: '2022-08-22T21:25:05',
});
