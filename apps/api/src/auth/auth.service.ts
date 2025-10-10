import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

export type UserRole = 'aluno' | 'instrutor'

export interface AuthenticatedUser {
  id: string
  email: string
  nome: string
  role: UserRole
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<AuthenticatedUser | null> {
    const aluno = await this.prisma.aluno.findUnique({ where: { email } })
    if (aluno && (await bcrypt.compare(senha, aluno.senhaHash))) {
      const { id, nome } = aluno
      return { id, email: aluno.email, nome, role: 'aluno' }
    }

    const instrutor = await this.prisma.instrutor.findUnique({ where: { email } })
    if (instrutor && (await bcrypt.compare(senha, instrutor.senhaHash))) {
      const { id, nome } = instrutor
      return { id, email: instrutor.email, nome, role: 'instrutor' }
    }

    return null
  }

  async getUserById(id: string, role: UserRole): Promise<AuthenticatedUser | null> {
    if (role === 'aluno') {
      const aluno = await this.prisma.aluno.findUnique({ where: { id } })
      if (!aluno) {
        return null
      }
      const { email, nome } = aluno
      return { id: aluno.id, email, nome, role }
    }

    const instrutor = await this.prisma.instrutor.findUnique({ where: { id } })
    if (!instrutor) {
      return null
    }
    const { email, nome } = instrutor
    return { id: instrutor.id, email, nome, role }
  }

  async login(user: AuthenticatedUser): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
