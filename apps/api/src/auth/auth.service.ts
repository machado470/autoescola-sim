import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    // credenciais de demo por env (com defaults)
    const envEmail = process.env.AUTH_EMAIL ?? 'demc@local.test';
    const envPass  = process.env.AUTH_PASSWORD ?? 'demo123';

    if (email !== envEmail || password !== envPass) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: 'env-user', email };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }

  async me(tokenPayload: any) {
    return { email: tokenPayload?.email, sub: tokenPayload?.sub };
  }
}
