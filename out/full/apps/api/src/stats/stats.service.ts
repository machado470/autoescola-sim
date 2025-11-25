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
      this.prisma.category.count(),
      this.prisma.category.count(),
      this.prisma.question.count(),
    ])

    return {
      alunos,
      instrutores,
      simulados,
    }
  }
}
