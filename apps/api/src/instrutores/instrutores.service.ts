import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInstrutorDto } from './dto/create-instrutor.dto'
import { UpdateInstrutorDto } from './dto/update-instrutor.dto'

@Injectable()
export class InstrutoresService {
  constructor(private readonly prisma: PrismaService) {}

  create(createInstrutorDto: CreateInstrutorDto) {
    return this.prisma.instrutor.create({
      data: createInstrutorDto,
    })
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

  async update(id: string, updateInstrutorDto: UpdateInstrutorDto) {
    await this.findOne(id)

    return this.prisma.instrutor.update({
      where: { id },
      data: updateInstrutorDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.instrutor.delete({
      where: { id },
    })
  }
}
