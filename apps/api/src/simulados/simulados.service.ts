import { Injectable, NotFoundException } from '@nestjs/common'
import { Simulado } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSimuladoDto } from './dto/create-simulado.dto'
import { UpdateSimuladoDto } from './dto/update-simulado.dto'

@Injectable()
export class SimuladosService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureExists(id: string): Promise<Simulado> {
    const simulado = await this.prisma.simulado.findUnique({
      where: { id },
    })

    if (!simulado) {
      throw new NotFoundException(`Simulado with ID "${id}" not found`)
    }

    return simulado
  }

  create(createSimuladoDto: CreateSimuladoDto) {
    const { data, ...rest } = createSimuladoDto

    return this.prisma.simulado.create({
      data: {
        ...rest,
        ...(data ? { data } : {}),
      },
      include: {
        aluno: true,
      },
    })
  }

  findAll() {
    return this.prisma.simulado.findMany({
      orderBy: {
        data: 'desc',
      },
      include: {
        aluno: true,
      },
    })
  }

  async findOne(id: string) {
    await this.ensureExists(id)

    return this.prisma.simulado.findUnique({
      where: { id },
      include: {
        aluno: true,
      },
    })
  }

  async update(id: string, updateSimuladoDto: UpdateSimuladoDto) {
    await this.ensureExists(id)

    const { data, ...rest } = updateSimuladoDto

    return this.prisma.simulado.update({
      where: { id },
      data: {
        ...rest,
        ...(data ? { data } : {}),
      },
      include: {
        aluno: true,
      },
    })
  }

  async remove(id: string) {
    await this.ensureExists(id)

    return this.prisma.simulado.delete({
      where: { id },
    })
  }
}
