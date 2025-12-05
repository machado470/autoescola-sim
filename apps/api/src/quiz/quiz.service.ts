import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async startQuiz(userId: string, phaseId: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id: phaseId },
    });

    if (!phase) throw new NotFoundException("Fase não encontrada");

    return this.prisma.quizSession.create({
      data: {
        userId,
        phaseId,
        createdAt: new Date(),
      },
    });
  }

  async finishQuiz(userId: string, quizId: string, answers: any[]) {
    const quiz = await this.prisma.quizSession.findUnique({
      where: { id: quizId },
    });

    if (!quiz) throw new NotFoundException("Quiz não encontrado");

    const correct = answers.filter((a) => a.isCorrect).length;

    await this.prisma.quizSession.update({
      where: { id: quizId },
      data: {
        updatedAt: new Date(),
        score: correct,
      },
    });

    await this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId: quiz.phaseId } },
      update: { correctAnswers: { increment: correct } },
      create: {
        userId,
        phaseId: quiz.phaseId,
        correctAnswers: correct,
      },
    });

    return { correct };
  }
}
