import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimulatorService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.simulado.create({ data });
  }

  findAll() {
    return this.prisma.simulado.findMany();
  }

  findOne(id: number) {
    return this.prisma.simulado.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.simulado.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.simulado.delete({ where: { id } });
  }
}
