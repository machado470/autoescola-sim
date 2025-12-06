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

    const questions = await this.prisma.question.findMany({
      where: { phaseId },
      orderBy: { order: "asc" },
    });

    if (questions.length === 0)
      throw new NotFoundException("Nenhuma pergunta encontrada nesta fase");

    const quiz = await this.prisma.quizSession.create({
      data: {
        userId,
        phaseId,
        createdAt: new Date(),
      },
    });

    return {
      quizId: quiz.id,
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        statement: q.statement,
        alternatives: [q.optionA, q.optionB, q.optionC, q.optionD],
      })),
    };
  }

  async finishQuiz(
    userId: string,
    quizId: string,
    answers: { questionId: string; selected: string }[],
  ) {
    const quiz = await this.prisma.quizSession.findUnique({
      where: { id: quizId },
      include: { phase: true },
    });

    if (!quiz) throw new NotFoundException("Quiz não encontrado");

    const questions = await this.prisma.question.findMany({
      where: { phaseId: quiz.phaseId },
    });

    const correctMap = new Map<string, string>();
    questions.forEach((q) => correctMap.set(q.id, q.correct));

    let correctCount = 0;

    for (const ans of answers) {
      const correct = correctMap.get(ans.questionId);
      if (!correct) continue;
      if (ans.selected === correct) correctCount++;
    }

    await this.prisma.quizSession.update({
      where: { id: quizId },
      data: {
        score: correctCount,
        updatedAt: new Date(),
      },
    });

    await this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId: quiz.phaseId } },
      update: { correctAnswers: { increment: correctCount } },
      create: {
        userId,
        phaseId: quiz.phaseId,
        correctAnswers: correctCount,
      },
    });

    return {
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
    };
  }
}
