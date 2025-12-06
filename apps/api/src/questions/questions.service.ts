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

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({ where: { id } });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
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

  async update(id: string, dto: UpdateQuestionDto) {
    await this.findOne(id);

    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.question.delete({
      where: { id }});
  }
}
