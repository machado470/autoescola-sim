import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.auth.login(email, password);
  }

  @Get('me')
  async me(@Req() req: any) {
    // versão simples: lê o bearer na mão
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return { authenticated: false };
    }
    const token = authHeader.replace('Bearer ', '');
    const payload = await this.jwt.verifyAsync(token);
    return { authenticated: true, user: payload };
  }
}
