import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInstrutorDto } from './dto/create-instrutor.dto'
import { UpdateInstrutorDto } from './dto/update-instrutor.dto'

@Injectable()
export class InstrutoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInstrutorDto: CreateInstrutorDto) {
    const { senha, nome, email, cnh, schoolId } = createInstrutorDto
    const senhaHash = await bcrypt.hash(senha, 10)

    const data: Prisma.InstrutorCreateInput = {
      nome,
      email,
      senhaHash,
      cnh: cnh ?? null,
      ...(schoolId && { school: { connect: { id: schoolId } } }),
    }

    return this.prisma.instrutor.create({ data })
  }

  findAll() {
    return this.prisma.instrutor.findMany({ include: { school: true } })
  }

  async findOne(id: string) {
    const instrutor = await this.prisma.instrutor.findUnique({
      where: { id },
      include: { school: true },
    })
    if (!instrutor)
      throw new NotFoundException(`Instrutor '${id}' não encontrado`)
    return instrutor
  }

  async update(id: string, updateInstrutorDto: UpdateInstrutorDto) {
    const { nome, email, cnh, senha, schoolId } = updateInstrutorDto
    const data: Prisma.InstrutorUpdateInput = {
      nome,
      email,
      cnh: cnh ?? null,
      ...(senha && { senhaHash: await bcrypt.hash(senha, 10) }),
      ...(schoolId && { school: { connect: { id: schoolId } } }),
    }

    return this.prisma.instrutor.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.instrutor.delete({ where: { id } })
  }
}
