import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}

  findByPhase(phaseId: string) {
    return this.prisma.lesson.findMany({
      where: { phaseId },
      orderBy: { order: 'asc' },
    });
  }

  create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        order: dto.order,
        categoryId: dto.categoryId,
        phaseId: dto.phaseId,
        imageUrl: dto.imageUrl ?? null,
        videoUrl: dto.videoUrl ?? null,
      },
    });
  }
}
