import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.aula.findMany({
      include: {
        fase: {
          include: {
            categoria: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.aula.findUnique({
      where: { id },
      include: {
        fase: {
          include: {
            categoria: true,
          },
        },
      },
    });
  }

  findByPhase(phaseId: number) {
    return this.prisma.aula.findMany({
      where: { faseId: phaseId },
      include: {
        fase: {
          include: {
            categoria: true,
          },
        },
      },
    });
  }

  findByCategory(categoryId: number) {
    return this.prisma.aula.findMany({
      where: {
        fase: {
          categoriaId: categoryId,
        },
      },
      include: {
        fase: {
          include: {
            categoria: true,
          },
        },
      },
    });
  }
}

