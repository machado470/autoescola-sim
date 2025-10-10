import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService, AuthenticatedUser } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'senha' })
  }

  async validate(email: string, senha: string): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(email, senha)
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    return user
  }
}
