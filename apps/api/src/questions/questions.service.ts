import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  // Listar todas as questões
  async getAll() {
    return this.prisma.question.findMany({
      orderBy: { text: 'asc' },
    });
  }

  // Listar por fase
  async getByPhase(phaseId: string) {
    return this.prisma.question.findMany({
      where: { phaseId },
      orderBy: { text: 'asc' },
    });
  }

  // Criar questão
  async create(dto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        text: dto.text,
        answer: dto.answer,
        phaseId: dto.phaseId,
      },
    });
  }

  // Editar questão
  async update(id: string, dto: UpdateQuestionDto) {
    const exists = await this.prisma.question.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Questão não encontrada.');

    return this.prisma.question.update({
      where: { id },
      data: {
        text: dto.text ?? exists.text,
        answer: dto.answer ?? exists.answer,
        phaseId: dto.phaseId ?? exists.phaseId,
      },
    });
  }

  // Deletar questão
  async delete(id: string) {
    const exists = await this.prisma.question.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Questão não encontrada.');

    return this.prisma.question.delete({ where: { id } });
  }
}
