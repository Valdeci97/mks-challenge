import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../users.entity';

export const updateUserBody: UpdateUserDto = {
  name: 'usuário teste da silva',
};

export const updatedUser: User = new User({
  id: 'abc34',
  ...updateUserBody,
  email: 'user@test.com',
  password: 'Senhaforte123*',
  createdAt: '2022-08-22T21:25:05',
});
