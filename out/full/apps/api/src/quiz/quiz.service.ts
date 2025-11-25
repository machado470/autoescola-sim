import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async random(limit = 10) {
    const ids = await this.prisma.question.findMany({ select: { id: true } });
    const chosen = ids
      .map(i => i.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    return this.prisma.question.findMany({
      where: { id: { in: chosen } },
      include: {
        answers: true,
        category: true
      }
    });
  }
}
