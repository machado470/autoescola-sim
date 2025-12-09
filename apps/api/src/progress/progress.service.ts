import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  // usado pelo controller
  async getStudentProgress(userId: string) {
    return this.prisma.studentProgress.findMany({
      where: { userId },
    });
  }

  // usado pelo controller
  async getProgressByPhase(userId: string, phaseId: string) {
    return this.prisma.studentProgress.findFirst({
      where: { userId, phaseId },
    });
  }

  // já existia — deixamos intacto
  async registerQuestionAnswer(userId: string, questionId: string, correct: boolean) {
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
      include: { phase: { include: { lessons: true, questions: true } } },
    });

    if (!question) throw new Error("Question not found");

    const phase = question.phase;
    const totalItems = phase.lessons.length + phase.questions.length;

    let progress = await this.prisma.studentProgress.findFirst({
      where: { userId, phaseId: phase.id },
    });

    if (!progress) {
      progress = await this.prisma.studentProgress.create({
        data: { userId, phaseId: phase.id },
      });
    }

    const newCorrect = correct
      ? progress.correctAnswers + 1
      : progress.correctAnswers;

    const percent = Math.round(
      ((progress.lessonsCompleted + newCorrect) / totalItems) * 100,
    );

    const updated = await this.prisma.studentProgress.update({
      where: { id: progress.id },
      data: {
        correctAnswers: newCorrect,
        finished: percent >= 100,
      },
    });

    return updated;
  }
}
