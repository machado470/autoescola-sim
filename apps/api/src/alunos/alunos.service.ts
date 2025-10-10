import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAlunoDto } from './dto/create-aluno.dto'
import { UpdateAlunoDto } from './dto/update-aluno.dto'

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAlunoDto: CreateAlunoDto) {
    return this.prisma.aluno.create({
      data: createAlunoDto,
    })
  }

  findAll() {
    return this.prisma.aluno.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
    })

    if (!aluno) {
      throw new NotFoundException(`Aluno with ID "${id}" not found`)
    }

    return aluno
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto) {
    await this.findOne(id)

    return this.prisma.aluno.update({
      where: { id },
      data: updateAlunoDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.aluno.delete({
      where: { id },
    })
  }
}
