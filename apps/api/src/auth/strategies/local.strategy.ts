import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'senha' });
  }

  // retorna o usuário autenticado; nada de validateUser
  async validate(email: string, senha: string) {
    const result: any = await this.authService.login(email, senha);
    const user = result?.user || result?.usuario || result?.data || null;
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
