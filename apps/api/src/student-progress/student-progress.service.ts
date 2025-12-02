import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentProgressService {
  constructor(private prisma: PrismaService) {}

  async getProgress(userId: string, categoryId: string) {
    return this.prisma.studentProgress.findFirst({
      where: { userId, categoryId },
    });
  }

  async registerResult(userId: string, categoryId: string, isCorrect: boolean) {
    const existing = await this.prisma.studentProgress.findFirst({
      where: { userId, categoryId },
    });

    if (!existing) {
      return this.prisma.studentProgress.create({
        data: {
          userId,
          categoryId,
          correct: isCorrect ? 1 : 0,
          wrong: isCorrect ? 0 : 1,
          progress: isCorrect ? 1 : 0,
        },
      });
    }

    return this.prisma.studentProgress.update({
      where: { id: existing.id },
      data: {
        correct: isCorrect ? existing.correct + 1 : existing.correct,
        wrong: !isCorrect ? existing.wrong + 1 : existing.wrong,
        progress: isCorrect
          ? existing.progress + 1
          : existing.progress,
      },
    });
  }
}
