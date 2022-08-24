import { ApiProperty } from '@nestjs/swagger';

export class SwaggerToken {
  @ApiProperty()
  token: string;
}
