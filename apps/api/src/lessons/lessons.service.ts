import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { ListLessonsDto } from './dto/list-lessons.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'

const lessonInclude = {
  instructor: true,
  student: true,
  school: true,
} satisfies Prisma.LessonInclude

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLessonDto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: createLessonDto,
      include: lessonInclude,
    })
  }

  async findAll({ page = 1, size = 20, q }: ListLessonsDto) {
    const where: Prisma.LessonWhereInput | undefined = q
      ? {
          OR: [
            { notes: { contains: q, mode: 'insensitive' } },
            { instructor: { name: { contains: q, mode: 'insensitive' } } },
            { student: { name: { contains: q, mode: 'insensitive' } } },
            { school: { name: { contains: q, mode: 'insensitive' } } },
          ],
        }
      : undefined

    const [data, total] = await this.prisma.$transaction([
      this.prisma.lesson.findMany({
        where,
        include: lessonInclude,
        orderBy: { date: 'desc' },
        skip: (page - 1) * size,
        take: size,
      }),
      this.prisma.lesson.count({ where }),
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
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: lessonInclude,
    })

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`)
    }

    return lesson
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    await this.findOne(id)

    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
      include: lessonInclude,
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.lesson.delete({
      where: { id },
      include: lessonInclude,
    })
  }
}
