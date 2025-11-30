import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const perguntas = await this.prisma.pergunta.findMany({
      include: {
        categoria: true,
        fase: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return perguntas;
  }
}

