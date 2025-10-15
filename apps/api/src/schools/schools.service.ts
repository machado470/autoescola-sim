import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'

@Injectable()
export class SchoolsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSchoolDto: CreateSchoolDto) {
    return this.prisma.school.create({
      data: createSchoolDto,
    })
  }

  findAll() {
    return this.prisma.school.findMany({
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findOne(id: number) {
    const school = await this.prisma.school.findUnique({
      where: { id },
    })

    if (!school) {
      throw new NotFoundException(`School with ID "${id}" not found`)
    }

    return school
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    await this.findOne(id)

    const data: Prisma.SchoolUpdateInput = { ...updateSchoolDto }

    return this.prisma.school.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    await this.findOne(id)

    return this.prisma.school.delete({
      where: { id },
    })
  }
}
