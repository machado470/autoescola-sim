import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body || {};
    return this.auth.login(email, password);
  }

  @Get('me')
  async me(@Req() req: any) {
    // leitura bruta do header para simplificar (substitui depois por AuthGuard)
    const authz = req.headers['authorization'] || '';
    const token = authz.startsWith('Bearer ') ? authz.slice(7) : '';
    const payload = token ? this.jwt.decode(token) : null;
    return this.auth.me(payload);
  }
}
