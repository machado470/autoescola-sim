import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async startQuiz(userId: string, phaseId: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id: phaseId },
    });

    if (!phase) throw new NotFoundException("Fase não encontrada.");

    const questions = await this.prisma.question.findMany({
      where: { phaseId },
      orderBy: { order: "asc" },
      take: 30,
    });

    if (!questions.length)
      throw new NotFoundException("Nenhuma questão disponível.");

    const session = await this.prisma.quizSession.create({
      data: {
        userId,
        phaseId,
      },
    });

    return {
      quizId: session.id,
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        statement: q.statement,
        options: [
          q.optionA,
          q.optionB,
          q.optionC,
          q.optionD,
        ].sort(() => Math.random() - 0.5),
      })),
    };
  }

  async finishQuiz(userId: string, quizId: string, answers: any[]) {
    const session = await this.prisma.quizSession.findUnique({
      where: { id: quizId },
    });

    if (!session) throw new NotFoundException("Sessão não encontrada.");
    if (session.userId !== userId)
      throw new ForbiddenException("Essa sessão não é sua.");

    let correct = 0;

    for (const answer of answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answer.questionId },
      });

      if (question && question.correct === answer.selected) correct++;
    }

    const wrong = answers.length - correct;

    await this.prisma.quizSession.update({
      where: { id: quizId },
      data: { score: correct },
    });

    return {
      quizId,
      total: answers.length,
      correct,
      wrong,
      score: (correct / answers.length) * 100,
    };
  }
}
