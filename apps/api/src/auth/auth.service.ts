import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
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
    const alunoWhere: Prisma.AlunoWhereUniqueInput = { email }
    const aluno = await this.prisma.aluno.findUnique({ where: alunoWhere })
    if (
      aluno?.email &&
      aluno.senhaHash &&
      (await bcrypt.compare(senha, aluno.senhaHash))
    ) {
      const { id, nome } = aluno
      return { id, email: aluno.email, nome, role: 'aluno' }
    }

    const instrutorWhere: Prisma.InstrutorWhereUniqueInput = { email }
    const instrutor = await this.prisma.instrutor.findUnique({
      where: instrutorWhere,
    })
    if (
      instrutor?.email &&
      instrutor.senhaHash &&
      (await bcrypt.compare(senha, instrutor.senhaHash))
    ) {
      const { id, nome } = instrutor
      return { id, email: instrutor.email, nome, role: 'instrutor' }
    }

    return null
  }

  async getUserById(id: string, role: UserRole): Promise<AuthenticatedUser | null> {
    if (role === 'aluno') {
      const aluno = await this.prisma.aluno.findUnique({ where: { id } })
      if (!aluno || !aluno.email) {
        return null
      }
      const { email, nome } = aluno
      return { id: aluno.id, email, nome, role }
    }

    const instrutor = await this.prisma.instrutor.findUnique({ where: { id } })
    if (!instrutor || !instrutor.email) {
      return null
    }
    const { email, nome } = instrutor
    return { id: instrutor.id, email, nome, role }
  }

  async login(user: AuthenticatedUser): Promise<{
    access_token: string
    user: AuthenticatedUser
  }> {
    const payload = { sub: user.id, email: user.email, role: user.role }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      access_token: accessToken,
      user,
    }
  }
}
