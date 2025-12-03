import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.questionAnswer.findMany();
  }

  findOne(id: string) {
    return this.prisma.questionAnswer.findUnique({ where: { id } });
  }

  async submit(dto: SubmitAnswerDto) {
    const { userId, questionId, selectedAlternative } = dto;

    const question = await this.prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Questão não encontrada');

    const isCorrect = question.correctAlternative === selectedAlternative;

    const saved = await this.prisma.questionAnswer.create({
      data: {
        userId,
        questionId,
        selectedAlternative,
        correct: isCorrect,
      },
    });

    return saved;
  }

  async finishQuiz(userId: string, phaseId: string) {
    const progress = await this.prisma.phaseProgress.findFirst({
      where: { userId, phaseId },
    });

    if (!progress) throw new NotFoundException('Progresso da fase não encontrado');

    return this.prisma.phaseProgress.update({
      where: { id: progress.id },
      data: { completedQuiz: true },
    });
  }

  remove(id: string) {
    return this.prisma.questionAnswer.delete({ where: { id } });
  }
}
