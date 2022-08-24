import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD } from 'src/utils/password.utils';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD.REGEX, { message: PASSWORD.MESSAGE })
  password: string;
}
