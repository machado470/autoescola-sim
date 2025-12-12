import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhaseDto } from './dto/create-phase.dto';

@Injectable()
export class PhasesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.phase.findMany({
      orderBy: { order: 'asc' },
    });
  }

  create(dto: CreatePhaseDto) {
    return this.prisma.phase.create({
      data: {
        name: dto.name,
        order: dto.order,
        categoryId: dto.categoryId,
      },
    });
  }
}
