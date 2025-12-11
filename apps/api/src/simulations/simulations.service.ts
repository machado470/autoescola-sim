import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimulationsService {
  constructor(private prisma: PrismaService) {}

  async startSimulation(userId: string) {
    const attempt = await this.prisma.simuladoAttempt.create({
      data: {
        userId,
        percentage: 0,
      },
    });

    return attempt;
  }

  async finishSimulation(userId: string, percentage: number) {
    return this.prisma.simuladoAttempt.create({
      data: { userId, percentage },
    });
  }

  async getHistory(userId: string) {
    return this.prisma.simuladoAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
