import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  // Simulado por categoria (todas as fases + questões)
  async getExamByCategory(categoryId: number) {
    const phases = await this.prisma.phase.findMany({
      where: { categoryId },
      include: {
        questions: {
          include: {
            answers: true,
          }
        }
      },
      orderBy: { order: 'asc' },
    });

    return {
      categoryId,
      phases,
    };
  }

  // Simulado por fase específica
  async getExamByPhase(phaseId: number) {
    const phase = await this.prisma.phase.findUnique({
      where: { id: phaseId },
      include: {
        questions: {
          include: { answers: true },
        },
        category: true,
      },
    });

    return phase;
  }
}
