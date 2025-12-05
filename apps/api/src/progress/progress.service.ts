import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getPhaseProgress(userId: string, phaseId: string) {
    return this.prisma.studentProgress.findUnique({
      where: { userId_phaseId: { userId, phaseId } },
    });
  }

  async completeLesson(userId: string, phaseId: string) {
    return this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId } },
      update: { lessonsCompleted: { increment: 1 } },
      create: { userId, phaseId, lessonsCompleted: 1 },
    });
  }

  async answerQuestion(userId: string, phaseId: string, isCorrect: boolean) {
    return this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId } },
      update: isCorrect ? { correctAnswers: { increment: 1 } } : {},
      create: {
        userId,
        phaseId,
        correctAnswers: isCorrect ? 1 : 0,
      },
    });
  }

  async finishPhase(userId: string, phaseId: string) {
    const progress = await this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId } },
      update: { finished: true },
      create: { userId, phaseId, finished: true },
    });

    // entrega XP
    await this.prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 20 } },
    });

    return progress;
  }
}
