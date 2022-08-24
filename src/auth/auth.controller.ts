import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../app/swagger/exceptions/badRequest.swagger';
import { SwaggerToken } from '../app/swagger/token.swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate bearer token' })
  @ApiResponse({
    status: 200,
    description: 'Return generated token',
    type: SwaggerToken,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async login(@Req() req: any) {
    return this.service.login(req.user);
  }
}
