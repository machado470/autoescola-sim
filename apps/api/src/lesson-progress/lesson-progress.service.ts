import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StartLessonDto } from './dto/start-lesson.dto';
import { FinishLessonDto } from './dto/finish-lesson.dto';

@Injectable()
export class LessonProgressService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lessonProgress.findMany();
  }

  findOne(id: string) {
    return this.prisma.lessonProgress.findUnique({ where: { id } });
  }

  async startLesson(dto: StartLessonDto) {
    const { userId, lessonId } = dto;

    const existing = await this.prisma.lessonProgress.findFirst({
      where: { userId, lessonId },
    });

    if (existing) return existing;

    return this.prisma.lessonProgress.create({
      data: {
        userId,
        lessonId,
        completed: false,
      },
    });
  }

  async finishLesson(id: string, dto: FinishLessonDto) {
    const lesson = await this.prisma.lessonProgress.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Progresso de lição não encontrado');

    return this.prisma.lessonProgress.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.lessonProgress.delete({ where: { id } });
  }
}
