import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimulatorService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.question.create({ data });
  }

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.question.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
