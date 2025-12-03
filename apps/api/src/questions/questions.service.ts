import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(id: string) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  findByPhase(phaseId: string) {
    return this.prisma.question.findMany({
      where: { phaseId },
      orderBy: { order: 'asc' },
    });
  }

  create(dto: CreateQuestionDto) {
    return this.prisma.question.create({ data: dto });
  }

  update(id: string, dto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}
