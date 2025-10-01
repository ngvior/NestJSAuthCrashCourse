import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthInput, AuthService } from './auth.service'
import { PassportLocalGuard } from './guards/passport-local.guard'
import { PassportJwtGuard } from './guards/passport-jwt.guard'

@Controller('auth/v2')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Get('me')
  @UseGuards(PassportJwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Request() req) {
    return req.user;
  }
}
