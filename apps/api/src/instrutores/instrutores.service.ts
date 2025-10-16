import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInstructorDto, UpdateInstructorDto } from './instrutores.dto'

@Injectable()
export class InstrutoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInstructorDto) {
    const { senha, nome, email, cpf, cnh } = data
    const senhaHash = await bcrypt.hash(senha, 10)

    const createData: Prisma.InstrutorCreateInput = {
      nome,
      email,
      cpf,
      senhaHash,
      cnh: cnh ?? null,
    }

    return this.prisma.instrutor.create({ data: createData })
  }

  findAll() {
    return this.prisma.instrutor.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findOne(id: string) {
    const instrutor = await this.prisma.instrutor.findUnique({
      where: { id },
    })

    if (!instrutor) {
      throw new NotFoundException(`Instrutor with ID "${id}" not found`)
    }

    return instrutor
  }

  async update(id: string, data: UpdateInstructorDto) {
    await this.findOne(id)

    const { senha, nome, email, cpf, cnh } = data
    const updateData: Prisma.InstrutorUpdateInput = {}

    if (typeof nome !== 'undefined') {
      updateData.nome = nome
    }

    if (typeof email !== 'undefined') {
      updateData.email = email
    }

    if (typeof cpf !== 'undefined') {
      updateData.cpf = cpf
    }

    if (typeof cnh !== 'undefined') {
      updateData.cnh = cnh ?? null
    }

    if (typeof senha !== 'undefined') {
      updateData.senhaHash = await bcrypt.hash(senha, 10)
    }

    return this.prisma.instrutor.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.instrutor.delete({
      where: { id },
    })
  }
}
