import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  start(userId: string, categoryId: string, total: number) {
    return this.prisma.quizSession.create({
      data: { userId, categoryId, total, correct: 0, wrong: 0 },
    });
  }

  finish(sessionId: string, data: { correct: number; wrong: number }) {
    return this.prisma.quizSession.update({
      where: { id: sessionId },
      data,
    });
  }
}
