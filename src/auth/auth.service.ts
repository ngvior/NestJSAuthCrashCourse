import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

export type AuthInput = { username: string; password: string };
export type SignInData = { id: number; username: string };
export type AuthResult = { accessToken: string; user: SignInData };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ username, password }: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser({
    username,
    password,
  }: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      return { id: user.id, username: user.username };
    }
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
