import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD } from 'src/utils/password.utils';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(PASSWORD.REGEX, { message: PASSWORD.MESSAGE })
  @ApiProperty()
  password: string;
}
