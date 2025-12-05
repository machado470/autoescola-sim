import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async ensureRelations(categoryId: string, phaseId: string) {
    const phase = await this.prisma.phase.findUnique({ where: { id: phaseId }});
    if (!phase) throw new NotFoundException('Phase not found');

    if (phase.categoryId !== categoryId) {
      throw new BadRequestException('Phase does not belong to provided category');
    }
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      orderBy: { order: 'asc' },
      include: { category: true, phase: true }
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { category: true, phase: true }
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async findByPhase(phaseId: string) {
    return this.prisma.lesson.findMany({
      where: { phaseId },
      orderBy: { order: 'asc' }
    });
  }

  async create(dto: CreateLessonDto) {
    await this.ensureRelations(dto.categoryId, dto.phaseId);

    return this.prisma.lesson.create({
      data: dto,
      include: { category: true, phase: true }
    });
  }

  async update(id: string, dto: UpdateLessonDto) {
    const existing = await this.prisma.lesson.findUnique({ where: { id }});
    if (!existing) throw new NotFoundException('Lesson not found');

    if (dto.categoryId || dto.phaseId) {
      await this.ensureRelations(dto.categoryId ?? existing.categoryId, dto.phaseId ?? existing.phaseId);
    }

    return this.prisma.lesson.update({
      where: { id },
      data: dto,
      include: { category: true, phase: true }
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.lesson.findUnique({ where: { id }});
    if (!exists) throw new NotFoundException('Lesson not found');

    return this.prisma.lesson.delete({ where: { id }});
  }
}
