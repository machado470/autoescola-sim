import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.question.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async create(data: any) {
    return this.prisma.question.create({
      data,
    });
  }

  async update(id: number, data: any) {
    await this.findOne(id); // garante que existe
    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
