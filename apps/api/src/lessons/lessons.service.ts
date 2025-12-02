import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lesson.findMany({
      include: { phase: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { phase: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    return lesson;
  }

  create(data: CreateLessonDto) {
    return this.prisma.lesson.create({
      data,
    });
  }

  async update(id: string, data: UpdateLessonDto) {
    await this.ensureExists(id);

    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    return this.prisma.lesson.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.lesson.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Lesson not found');
  }
}
