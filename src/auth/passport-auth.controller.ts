import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'
import { PassportLocalGuard } from './guards/passport-local.guard'
import { PassportJwtGuard } from './guards/passport-jwt.guard'
import { AuthResult, SignInData } from 'src/common/interfaces/auth.interfaces'

@Controller('auth/v2')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<AuthResult> {
    return this.authService.signIn(req.user);
  }

  @Get('me')
  @UseGuards(PassportJwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Request() req): Promise<SignInData> {
    return req.user;
  }
}
