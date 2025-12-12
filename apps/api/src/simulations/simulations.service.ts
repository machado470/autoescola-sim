import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimulationsService {
  constructor(private prisma: PrismaService) {}

  async startSimulation(userId: string, phaseId?: string) {
    return this.prisma.simulation.create({
      data: { userId },
    });
  }

  async recordAnswer(dto: {
    simulationId: string;
    questionId: string;
    selected: string;
  }) {
    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });

    if (!question) throw new Error('Pergunta não encontrada');

    const isCorrect = question.answer === dto.selected;

    return this.prisma.simulationAnswer.create({
      data: {
        simulationId: dto.simulationId,
        questionId: dto.questionId,
        selected: dto.selected,
        correct: isCorrect,
      },
    });
  }

  async finishSimulation(simulationId: string, userId: string) {
    const simulation = await this.prisma.simulation.findUnique({
      where: { id: simulationId },
      include: { answers: true },
    });

    if (!simulation) throw new Error('Simulação não encontrada');

    const total = simulation.answers.length;
    const acertos = simulation.answers.filter((a) => a.correct).length;
    const erros = total - acertos;

    await this.prisma.simulation.update({
      where: { id: simulationId },
      data: { finishedAt: new Date() },
    });

    await this.prisma.simuladoAttempt.create({
      data: {
        userId,
        percentage: Math.round((acertos / total) * 100),
      },
    });

    return { total, acertos, erros };
  }

  async getMySimulations(userId: string) {
    return this.prisma.simuladoAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 🔥 NOVO: RANKING GLOBAL
  async getRanking() {
    const users = await this.prisma.user.findMany({
      include: {
        attempts: true,
      },
    });

    const ranking = users
      .map(u => {
        const scores = u.attempts.map(a => a.percentage);
        if (scores.length === 0) return null;

        return {
          userId: u.id,
          name: u.name,
          email: u.email,
          bestScore: Math.max(...scores),
          lastScore: scores[scores.length - 1],
          attempts: scores.length,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.bestScore - a.bestScore);

    return ranking;
  }
}
