import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAlunoDto, UpdateAlunoDto } from './alunos.dto'

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.aluno.findMany()
  }

  async findOne(id: number) {
    const aluno = await this.prisma.aluno.findUnique({ where: { id } })
    if (!aluno) throw new NotFoundException('Aluno não encontrado')
    return aluno
  }

  async create(data: CreateAlunoDto) {
    return this.prisma.aluno.create({ data })
  }

  async update(id: number, data: UpdateAlunoDto) {
    return this.prisma.aluno.update({ where: { id }, data })
  }

  async remove(id: number) {
    return this.prisma.aluno.delete({ where: { id } })
  }
}
