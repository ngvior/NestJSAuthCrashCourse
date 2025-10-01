import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import type {
  AuthInput,
  AuthResult,
  SignInData,
} from 'src/common/interfaces/auth.interfaces'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() input: AuthInput,
  ): Promise<AuthResult> {
    const result = await this.authService.authenticate(input);
    return result;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getUserInfo(@Request() req): SignInData {
    return req.user;
  }
}
