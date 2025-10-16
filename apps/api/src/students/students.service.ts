import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { ListStudentsDto } from './dto/list-students.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: createStudentDto,
    })
  }

  async findAll({ page = 1, size = 20, q }: ListStudentsDto) {
    const where: Prisma.StudentWhereInput | undefined = q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { email: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
          ],
        }
      : undefined

    const [data, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
      this.prisma.student.count({ where }),
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
    const student = await this.prisma.student.findUnique({
      where: { id },
    })

    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`)
    }

    return student
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.findOne(id)

    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.student.delete({
      where: { id },
    })
  }
}
