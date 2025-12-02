import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhasesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.phase.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
        lessons: false,
        questions: false,
      },
    });
  }

  async findOne(id: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: {
        category: true,
        lessons: true,
        questions: true,
      },
    });

    if (!phase) {
      throw new NotFoundException('Fase não encontrada');
    }

    return phase;
  }
}
