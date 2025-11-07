import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class SimuladosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    return this.prisma.question.create({ data });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: { category: true, answers: true },
    });
  }

  async findOne(id: number) {
    const q = await this.prisma.question.findUnique({
      where: { id },
      include: { category: true, answers: true },
    });
    if (!q) throw new NotFoundException(`Question ${id} not found`);
    return q;
  }

  async update(id: number, data: UpdateQuestionDto) {
    return this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
