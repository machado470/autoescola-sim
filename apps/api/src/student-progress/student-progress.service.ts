import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentProgressService {
  constructor(private prisma: PrismaService) {}

  // progresso de UMA fase
  getPhaseProgress(userId: string, phaseId: string) {
    return this.prisma.studentProgress.findUnique({
      where: { userId_phaseId: { userId, phaseId } },
    });
  }

  // progresso consolidado do aluno em TODAS as categorias
  async getUserDashboard(userId: string) {
    const categories = await this.prisma.category.findMany({
      include: {
        phases: {
          include: {
            _count: { select: { lessons: true } },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    const progresses = await this.prisma.studentProgress.findMany({
      where: { userId },
    });

    const progressMap = Object.fromEntries(
      progresses.map((p) => [p.phaseId, p])
    );

    return categories.map((cat) => {
      const fases = cat.phases.map((phase) => {
        const pr = progressMap[phase.id];

        const aulasConcluidas = pr?.completedLessons || 0;
        const totalAulas = phase._count.lessons || 0;

        const pct =
          totalAulas > 0
            ? Math.min((aulasConcluidas / totalAulas) * 100, 100)
            : 0;

        return {
          phaseId: phase.id,
          name: phase.name,
          order: phase.order,
          totalAulas,
          aulasConcluidas,
          acertos: pr?.correctAnswers || 0,
          erros: pr?.wrongAnswers || 0,
          concluida: pr?.isDone || false,
          progresso: pct,
        };
      });

      return {
        categoryId: cat.id,
        categoryName: cat.name,
        fases,
        progressoTotal:
          fases.length > 0
            ? Math.round(
                fases.reduce((acc, f) => acc + f.progresso, 0) / fases.length
              )
            : 0,
      };
    });
  }

  // cria fase se não existir
  startPhase(userId: string, phaseId: string) {
    return this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId } },
      update: {},
      create: {
        userId,
        phaseId,
        completedLessons: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        isDone: false,
      },
    });
  }

  completeLesson(userId: string, phaseId: string) {
    return this.prisma.studentProgress.update({
      where: { userId_phaseId: { userId, phaseId } },
      data: { completedLessons: { increment: 1 } },
    });
  }

  registerAnswer(userId: string, phaseId: string, correct: boolean) {
    return this.prisma.studentProgress.update({
      where: { userId_phaseId: { userId, phaseId } },
      data: {
        correctAnswers: { increment: correct ? 1 : 0 },
        wrongAnswers: { increment: !correct ? 1 : 0 },
      },
    });
  }

  finishPhase(userId: string, phaseId: string) {
    return this.prisma.studentProgress.update({
      where: { userId_phaseId: { userId, phaseId } },
      data: { isDone: true },
    });
  }
}
