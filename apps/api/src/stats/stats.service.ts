import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

export type StatsResponse = {
  alunos: number
  instrutores: number
  simulados: number
}

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<StatsResponse> {
    const [alunos, instrutores, simulados] = await Promise.all([
      this.prisma.aluno.count(),
      this.prisma.instrutor.count(),
      this.prisma.simulado.count(),
    ])

    return {
      alunos,
      instrutores,
      simulados,
    }
  }
}
