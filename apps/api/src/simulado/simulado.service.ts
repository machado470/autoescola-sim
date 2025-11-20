import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SimuladoService {
  constructor(private prisma: PrismaService) {}

  async start(userId: number) {
    return this.prisma.examSession.create({
      data: { userId },
    });
  }

  async finish(userId: number, body: any) {
    const { sessionId, answers } = body;

    let correctCount = 0;

    for (const ans of answers) {
      const correctAnswer = await this.prisma.answer.findFirst({
        where: { questionId: ans.questionId, correct: true },
      });

      const correct = correctAnswer?.id === ans.answerId;
      if (correct) correctCount++;

      await this.prisma.examAnswer.create({
        data: {
          sessionId,
          questionId: ans.questionId,
          answerId: ans.answerId,
          correct,
        },
      });
    }

    return this.prisma.examSession.update({
      where: { id: sessionId },
      data: { score: correctCount, endAt: new Date() },
    });
  }

  async history(userId: number) {
    return this.prisma.examSession.findMany({
      where: { userId },
      include: { answers: true },
      orderBy: { id: "desc" },
    });
  }
}
