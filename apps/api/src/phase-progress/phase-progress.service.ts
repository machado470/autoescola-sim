import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StartPhaseDto } from './dto/start-phase.dto';
import { UpdatePhaseProgressDto } from './dto/update-progress.dto';

@Injectable()
export class PhaseProgressService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phaseProgress.findMany();
  }

  findOne(id: string) {
    return this.prisma.phaseProgress.findUnique({ where: { id } });
  }

  async startPhase(dto: StartPhaseDto) {
    const { userId, phaseId } = dto;

    const existing = await this.prisma.phaseProgress.findFirst({
      where: { userId, phaseId },
    });

    if (existing) return existing;

    return this.prisma.phaseProgress.create({
      data: {
        userId,
        phaseId,
        completedLessons: 0,
        totalLessons: 0,
        completedQuiz: false,
      },
    });
  }

  async update(id: string, dto: UpdatePhaseProgressDto) {
    const progress = await this.prisma.phaseProgress.findUnique({ where: { id } });
    if (!progress) throw new NotFoundException('Progresso não encontrado');

    return this.prisma.phaseProgress.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.phaseProgress.delete({ where: { id } });
  }
}
