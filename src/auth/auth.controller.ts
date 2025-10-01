import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { AuthInput, AuthResult, SignInData } from './auth.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() input: AuthInput,
  ): Promise<{ statusCode: HttpStatus; data: AuthResult }> {
    const result = await this.authService.authenticate(input);
    return { statusCode: HttpStatus.OK, data: result };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getUserInfo(@Request() req): { statusCode: HttpStatus; user: SignInData } {
    return { statusCode: HttpStatus.OK, user: req.user };
  }
}
