import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAlunoDto } from './dto/create-aluno.dto'
import { UpdateAlunoDto } from './dto/update-aluno.dto'

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const { senha, ...data } = createAlunoDto
    const senhaHash = await bcrypt.hash(senha, 10)

    return this.prisma.aluno.create({
      data: {
        ...data,
        senhaHash,
      },
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

    const { senha, ...data } = updateAlunoDto
    const updateData: Prisma.AlunoUpdateInput = { ...data }

    if (senha) {
      updateData.senhaHash = await bcrypt.hash(senha, 10)
    }

    return this.prisma.aluno.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.aluno.delete({
      where: { id },
    })
  }
}
