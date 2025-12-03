import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  // ============================
  // START QUIZ
  // ============================
  async startQuiz(userId: string, dto: StartQuizDto) {
    const { categoryId } = dto;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada.');

    const questions = await this.prisma.question.findMany({
      where: { categoryId },
      orderBy: { id: 'asc' },
      take: 30,
    });

    if (questions.length === 0)
      throw new NotFoundException('Nenhuma questão disponível.');

    const session = await this.prisma.quizSession.create({
      data: {
        id: randomUUID(),
        userId,
        categoryId,
        total: questions.length,
        correct: 0,
        wrong: 0,
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

  // ============================
  // FINISH QUIZ
  // ============================
  async finishQuiz(userId: string, dto: SubmitQuizDto) {
    const session = await this.prisma.quizSession.findUnique({
      where: { id: dto.quizId },
    });

    if (!session) throw new NotFoundException('Sessão não encontrada.');

    if (session.userId !== userId)
      throw new ForbiddenException('Esta sessão não pertence a você.');

    let correct = 0;

    for (const answer of dto.answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answer.questionId },
      });

      if (question && question.correct === answer.selected) {
        correct++;
      }
    }

    const wrong = dto.answers.length - correct;

    await this.prisma.quizSession.update({
      where: { id: dto.quizId },
      data: { correct, wrong },
    });

    return {
      quizId: dto.quizId,
      total: dto.answers.length,
      correct,
      wrong,
      score: (correct / dto.answers.length) * 100,
    };
  }
}
