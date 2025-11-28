import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhaseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phase.findMany();
  }

  findByCategory(categoryId: number) {
    return this.prisma.phase.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' },
    });
  }
}
