import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthInput,
  AuthResult,
  SignInData,
} from 'src/common/interfaces/auth.interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = this.validateUser(input);
    if (!user) throw new UnauthorizedException();
    return await this.signIn(user);
  }

  validateUser(input: AuthInput): SignInData | null {
    const user = this.usersService.findByUsername(input.username);
    if (user && user.password === input.password)
      return { id: user.id, username: user.username };
    return null;
  }

  async signIn(payload: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: payload.id,
      username: payload.username,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, user: payload };
  }
}
