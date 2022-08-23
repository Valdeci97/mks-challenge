import { IsEmail, IsNotEmpty, Matches, Min } from 'class-validator';
import { PASSWORD } from 'src/utils/password.utils';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(8)
  @Matches(PASSWORD.REGEX, { message: PASSWORD.MESSAGE })
  password: string;
}
