import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // 👈 força uso de "email" no corpo
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('📩 LocalStrategy.validate =>', { email, password });
    const user = await this.authService.validateUser(email, password);
    console.log('🔍 Resultado validateUser =>', user);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    return user;
  }
}
