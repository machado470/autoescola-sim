import { Injectable } from '@nestjs/common';
import { Prisma, Difficulty } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getRandom(params: {
    limit?: number;
    difficulty?: Difficulty;
    excludeIds?: number[];
    includeAnswers?: boolean;
  }) {
    const limit = params.limit && params.limit > 0 ? Math.min(params.limit, 50) : 10;

    const filters: Prisma.QuestionWhereInput = {};
    if (params.difficulty) filters.difficulty = params.difficulty;
    if (params.excludeIds && params.excludeIds.length > 0) filters.id = { notIn: params.excludeIds };

    // Vamos buscar IDs aleatórios para evitar ORDER BY RANDOM() pesado em tabelas grandes.
    const ids = await this.prisma.question.findMany({
      where: filters,
      select: { id: true },
      orderBy: { id: 'asc' },
      take: 200, // amostra
    });

    // Embaralha e pega 'limit'
    const shuffled = ids
      .map((v) => [Math.random(), v.id] as const)
      .sort((a, b) => a[0] - b[0])
      .slice(0, limit)
      .map(([, id]) => id);

    if (shuffled.length === 0) return [];

    const questions = await this.prisma.question.findMany({
      where: { id: { in: shuffled } },
      include: {
        choices: {
          select: { id: true, text: true, isCorrect: params.includeAnswers || false },
        },
      },
    });

    const shuffle = <T>(a: T[]) => a.map(v => [Math.random(), v] as const).sort((x,y)=>x[0]-y[0]).map(([,v])=>v);

    return questions.map(q => ({
      id: q.id,
      statement: q.statement,
      difficulty: q.difficulty,
      choices: shuffle(q.choices),
    }));
  }
}
