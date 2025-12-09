import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const q = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!q) throw new NotFoundException('Question not found');

    return {
      id: q.id,
      text: q.statement,
      explanation: q.explanation,
      answers: [
        { id: "A", text: q.optionA, correct: q.correct === "A" },
        { id: "B", text: q.optionB, correct: q.correct === "B" },
        { id: "C", text: q.optionC, correct: q.correct === "C" },
        { id: "D", text: q.optionD, correct: q.correct === "D" },
      ]
    };
  }
}
