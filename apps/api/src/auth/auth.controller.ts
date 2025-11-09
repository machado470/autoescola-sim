import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    return this.auth.login(email, password);
  }

  @Get('me')
  me(@Headers('authorization') authHeader?: string) {
    const token = authHeader?.replace(/^Bearer\s+/i, '') || '';
    const payload = token ? (this.jwt.decode(token) as any) : null;
    return this.auth.me(payload);
  }
}
