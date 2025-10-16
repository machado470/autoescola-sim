import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { ListInstructorsDto } from './dto/list-instructors.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'

@Injectable()
export class InstructorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.prisma.instructor.create({
      data: createInstructorDto,
    })
  }

  async findAll({ page = 1, size = 20, q }: ListInstructorsDto) {
    const where: Prisma.InstructorWhereInput | undefined = q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined

    const [data, total] = await this.prisma.$transaction([
      this.prisma.instructor.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
      this.prisma.instructor.count({ where }),
    ])

    const totalPages = total === 0 ? 0 : Math.ceil(total / size)

    return {
      data,
      meta: {
        total,
        page,
        size,
        totalPages,
      },
    }
  }

  async findOne(id: string) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { id },
    })

    if (!instructor) {
      throw new NotFoundException(`Instructor with ID "${id}" not found`)
    }

    return instructor
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    await this.findOne(id)

    return this.prisma.instructor.update({
      where: { id },
      data: updateInstructorDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.instructor.delete({
      where: { id },
    })
  }
}
