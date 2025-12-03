import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.phase.findMany({
      include: {
        category: true,
        questions: true,
        lessons: true,
        _count: { select: { lessons: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: {
        category: true,
        questions: true,
        lessons: true,
        _count: { select: { lessons: true } },
      },
    });

    if (!phase) throw new NotFoundException('Phase not found');

    return phase;
  }

  async create(dto: CreatePhaseDto) {
    return this.prisma.phase.create({ data: dto });
  }

  async update(id: string, dto: UpdatePhaseDto) {
    await this.ensureExists(id);
    return this.prisma.phase.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.phase.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.phase.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Phase not found');
  }
}
