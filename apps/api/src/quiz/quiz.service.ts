import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async generateQuiz(quantity: number) {
    const total = await this.prisma.question.count();

    if (total === 0) {
      throw new NotFoundException('No questions available');
    }

    const questions = await this.prisma.question.findMany({
      take: quantity,
      orderBy: { id: 'asc' },
    });

    return {
      quizId: randomUUID(),
      total,
      questions,
    };
  }

  async submitQuiz(dto: SubmitQuizDto) {
    let correct = 0;

    for (const answer of dto.answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answer.questionId },
      });

      if (!question) {
        throw new NotFoundException('Question not found');
      }

      // 🔥 CORREÇÃO: campo correto é "correct"
      if (question.correct === answer.selected) {
        correct++;
      }
    }

    const totalQuestions = dto.answers.length;

    return {
      quizId: dto.quizId,
      totalQuestions,
      correct,
      score: (correct / totalQuestions) * 100,
    };
  }
}
