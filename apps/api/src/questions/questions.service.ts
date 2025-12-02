import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.question.findMany();
  }

  create(data: any) {
    return this.prisma.question.create({ data });
  }

  random(categoryId: string, take = 10) {
    return this.prisma.question.findMany({
      where: { categoryId },
      take,
    });
  }
}
