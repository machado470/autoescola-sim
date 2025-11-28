import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  // RANDOM GLOBAL — pega questões aleatórias do banco inteiro
  async random(limit = 10) {
    const ids = await this.prisma.question.findMany({
      select: { id: true }
    });

    const chosen = ids
      .map((i) => i.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    return this.prisma.question.findMany({
      where: { id: { in: chosen } },
      include: {
        answers: true,
        phase: {
          include: {
            category: true
          }
        }
      }
    });
  }

  // RANDOM POR FASE
  async randomByPhase(phaseId: number, limit = 10) {
    const ids = await this.prisma.question.findMany({
      where: { phaseId },
      select: { id: true }
    });

    const chosen = ids
      .map((i) => i.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    return this.prisma.question.findMany({
      where: { id: { in: chosen } },
      include: {
        answers: true,
        phase: {
          include: {
            category: true
          }
        }
      }
    });
  }

  // RANDOM POR CATEGORIA
  async randomByCategory(categoryId: number, limit = 10) {
    const ids = await this.prisma.question.findMany({
      where: { phase: { categoryId } },
      select: { id: true }
    });

    const chosen = ids
      .map((i) => i.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    return this.prisma.question.findMany({
      where: { id: { in: chosen } },
      include: {
        answers: true,
        phase: {
          include: {
            category: true
          }
        }
      }
    });
  }
}

