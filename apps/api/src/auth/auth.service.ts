import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  // provisório: depois vamos buscar no banco
  async validateUser(email: string, password: string) {
    // TODO: trocar por prisma.user.findUnique
    if (email === 'admin@aes.com' && password === '123456') {
      return {
        id: 'admin-1',
        email,
        name: 'Administrador',
      };
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const token = await this.jwt.signAsync(payload);
    return {
      access_token: token,
      user,
    };
  }

  async me(tokenPayload: UserPayload) {
    return tokenPayload;
  }
}
