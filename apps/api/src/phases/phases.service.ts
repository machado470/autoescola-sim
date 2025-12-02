import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phase.findMany({
      include: { category: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!phase) throw new NotFoundException('Phase not found');

    return phase;
  }

  create(data: CreatePhaseDto) {
    return this.prisma.phase.create({ data });
  }

  async update(id: string, data: UpdatePhaseDto) {
    await this.ensureExists(id);
    return this.prisma.phase.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.phase.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.phase.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Phase not found');
  }
}
