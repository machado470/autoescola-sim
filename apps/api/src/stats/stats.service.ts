import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  // Estatísticas gerais do usuário
  async getUserStats(userId: number) {
    const sessions = await this.prisma.examSession.findMany({
      where: { userId },
      include: { answers: true },
    });

    const totalAnswers = sessions.flatMap((s) => s.answers).length;
    const correctAnswers = sessions
      .flatMap((s) => s.answers)
      .filter((a) => a.isCorrect).length;

    return {
      totalAnswers,
      correctAnswers,
      accuracy: totalAnswers > 0 ? correctAnswers / totalAnswers : 0,
    };
  }

  // Estatísticas por categoria
  async getCategoryStats(categoryId: number, userId: number) {
    const answers = await this.prisma.examAnswer.findMany({
      where: { userId },
      include: {
        question: {
          include: { phase: { include: { category: true } } },
        },
      },
    });

    const filtered = answers.filter(
      (a) => a.question.phase.category.id === categoryId,
    );

    const total = filtered.length;
    const correct = filtered.filter((x) => x.isCorrect).length;

    return {
      categoryId,
      total,
      correct,
      accuracy: total ? correct / total : 0,
    };
  }
}

