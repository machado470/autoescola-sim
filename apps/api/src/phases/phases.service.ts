import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phase.findMany({
      include: { category: true },
    });
  }
}
