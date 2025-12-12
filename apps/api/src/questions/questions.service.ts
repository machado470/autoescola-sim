import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  findByPhase(phaseId: string) {
    return this.prisma.question.findMany({
      where: { phaseId },
    });
  }

  create(dto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        text: dto.text,
        answer: dto.answer,
        phaseId: dto.phaseId,
      },
    });
  }
}
