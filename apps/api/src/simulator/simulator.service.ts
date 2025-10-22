import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimulatorService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.simulator.create({ data });
  }

  findAll() {
    return this.prisma.simulator.findMany();
  }

  findOne(id: number) {
    return this.prisma.simulator.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.simulator.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.simulator.delete({ where: { id } });
  }
}
