import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.question.findMany({
      include: {
        phase: true,
        category: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        phase: true,
        category: true,
      },
    });

    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  create(data: CreateQuestionDto) {
    return this.prisma.question.create({ data });
  }

  async update(id: string, data: UpdateQuestionDto) {
    await this.ensureExists(id);

    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    return this.prisma.question.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.question.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Question not found');
  }
}
