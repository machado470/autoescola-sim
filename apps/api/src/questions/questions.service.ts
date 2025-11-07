import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type FindParams = { q?: string; categoryId?: number; limit?: number; offset?: number };
type RandomParams = { categoryId?: number; limit?: number 
  difficulty?: any;
};

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async find(params: FindParams = {}) {
    const take = typeof params.limit === 'number' ? params.limit : undefined;
    const skip = typeof params.offset === 'number' ? params.offset : undefined;

    let rows: any[] = [];
    try {
      rows = await (this.prisma as any).question.findMany({
        where: {
          ...(params.q ? { statement: { contains: params.q, mode: 'insensitive' } } : {}),
          ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      });
    } catch {
      rows = [];
    }

    return (rows || []).map((q: any) => ({
      id: q?.id,
      statement: q?.statement ?? q?.enunciado ?? '',
      image: q?.image ?? q?.imagemUrl ?? null,
      categoryId: q?.categoryId ?? q?.categoriaId ?? null,
      difficulty: undefined,
      choices: [],
    }));
  }

  async getRandom(params: RandomParams = {}) {
    const limit = typeof params.limit === 'number' && params.limit > 0 ? params.limit : 10;
    const all = await this.find({ categoryId: params.categoryId, limit: undefined, offset: undefined });

    // shuffle simples e take
    const shuffled = [...all]
      .map((v: any) => [Math.random(), v] as const)
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v)
      .slice(0, limit);

    return shuffled;
  }
}
