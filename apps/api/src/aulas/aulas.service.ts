import { Injectable } from '@nestjs/common'
import { AulaStatus, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

type ListFilters = {
  from?: string
  to?: string
  instrutorId?: string
  alunoId?: string
}

type ListResponse = {
  aulas: Awaited<ReturnType<PrismaService['aula']['findMany']>>
  message?: string
}

type ActionResponse = {
  aula?: Awaited<ReturnType<PrismaService['aula']['findUnique']>>
  message: string
}

@Injectable()
export class AulasService {
  private readonly uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  private readonly aulaInclude: Prisma.AulaInclude = {
    aluno: { select: { id: true, nome: true } },
    instrutor: { select: { id: true, nome: true } },
  }

  constructor(private readonly prisma: PrismaService) {}

  private parseDate(value?: string): Date | null {
    if (!value) {
      return null
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date
  }

  private startOfDay(date: Date): Date {
    const copy = new Date(date)
    copy.setUTCHours(0, 0, 0, 0)
    return copy
  }

  private endOfDay(date: Date): Date {
    const copy = new Date(date)
    copy.setUTCHours(23, 59, 59, 999)
    return copy
  }

  private isUuid(value?: string): value is string {
    return typeof value === 'string' && this.uuidRegex.test(value)
  }

  private async ensureInstrutor(instrutorId: string) {
    const instrutor = await this.prisma.instrutor.findUnique({
      where: { id: instrutorId },
      select: { id: true },
    })

    return Boolean(instrutor)
  }

  private async ensureAluno(alunoId: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id: alunoId },
      select: { id: true },
    })

    return Boolean(aluno)
  }

  async list(filters: ListFilters): Promise<ListResponse> {
    const { from, to, instrutorId, alunoId } = filters
    const fromDate = this.parseDate(from)
    const toDate = this.parseDate(to)

    if (from && !fromDate) {
      return { aulas: [], message: 'Data inicial inválida.' }
    }

    if (to && !toDate) {
      return { aulas: [], message: 'Data final inválida.' }
    }

    if (fromDate && toDate && fromDate > toDate) {
      return {
        aulas: [],
        message: 'A data inicial não pode ser maior que a data final.',
      }
    }

    if (instrutorId && !this.isUuid(instrutorId)) {
      return { aulas: [], message: 'Instrutor ID inválido.' }
    }

    if (alunoId && !this.isUuid(alunoId)) {
      return { aulas: [], message: 'Aluno ID inválido.' }
    }

    if (instrutorId && !(await this.ensureInstrutor(instrutorId))) {
      return { aulas: [], message: 'Instrutor não encontrado.' }
    }

    if (alunoId && !(await this.ensureAluno(alunoId))) {
      return { aulas: [], message: 'Aluno não encontrado.' }
    }

    const where: Prisma.AulaWhereInput = {}

    if (fromDate || toDate) {
      where.data = {}

      if (fromDate) {
        where.data.gte = this.startOfDay(fromDate)
      }

      if (toDate) {
        where.data.lte = this.endOfDay(toDate)
      }
    }

    if (instrutorId) {
      where.instrutorId = instrutorId
    }

    if (alunoId) {
      where.alunoId = alunoId
    }

    const aulas = await this.prisma.aula.findMany({
      where,
      include: this.aulaInclude,
      orderBy: { data: 'asc' },
    })

    return {
      aulas,
      message:
        aulas.length === 0
          ? 'Nenhuma aula encontrada para o período selecionado.'
          : undefined,
    }
  }

  private async getAulaById(id: string) {
    if (!this.isUuid(id)) {
      return { aula: undefined, message: 'ID da aula inválido.' }
    }

    const aula = await this.prisma.aula.findUnique({
      where: { id },
      include: this.aulaInclude,
    })

    if (!aula) {
      return { aula: undefined, message: 'Aula não encontrada.' }
    }

    return { aula }
  }

  async concluir(id: string): Promise<ActionResponse> {
    const { aula, message } = await this.getAulaById(id)

    if (!aula) {
      return { message: message ?? 'Aula não encontrada.' }
    }

    if (aula.status === AulaStatus.CANCELADA) {
      return {
        aula,
        message: 'Não é possível concluir uma aula cancelada.',
      }
    }

    if (aula.status === AulaStatus.CONCLUIDA) {
      return {
        aula,
        message: 'Aula já estava concluída.',
      }
    }

    const updated = await this.prisma.aula.update({
      where: { id: aula.id },
      data: { status: AulaStatus.CONCLUIDA },
      include: this.aulaInclude,
    })

    return {
      aula: updated,
      message: 'Aula marcada como concluída.',
    }
  }

  async cancelar(id: string): Promise<ActionResponse> {
    const { aula, message } = await this.getAulaById(id)

    if (!aula) {
      return { message: message ?? 'Aula não encontrada.' }
    }

    if (aula.status === AulaStatus.CANCELADA) {
      return { aula, message: 'Aula já estava cancelada.' }
    }

    if (aula.status === AulaStatus.CONCLUIDA) {
      return {
        aula,
        message: 'Não é possível cancelar uma aula concluída.',
      }
    }

    const updated = await this.prisma.aula.update({
      where: { id: aula.id },
      data: { status: AulaStatus.CANCELADA },
      include: this.aulaInclude,
    })

    return {
      aula: updated,
      message: 'Aula cancelada com sucesso.',
    }
  }
}
