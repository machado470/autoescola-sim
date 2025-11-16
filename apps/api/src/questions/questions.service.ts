import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateQuestionDto) {
    return this.prisma.question.create({ data: dto });
  }

  findAll() {
    return this.prisma.question.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }

  async randomExam(size = 30) {
    const total = await this.prisma.question.count();
    const take = Math.min(size, total);
    return this.prisma.question.findMany({
      take,
      orderBy: { id: 'asc' },
    });
  }
}
