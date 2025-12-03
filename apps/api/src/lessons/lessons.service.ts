import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lesson.findMany();
  }

  findOne(id: string) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  findByPhase(phaseId: string) {
    return this.prisma.lesson.findMany({
      where: { phaseId },
      orderBy: { order: 'asc' },
    });
  }

  create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({ data: dto });
  }

  update(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
