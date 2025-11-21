import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phase.findMany({
      include: {
        questions: {
          include: { answers: true }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.phase.findUnique({
      where: { id },
      include: {
        questions: { include: { answers: true } }
      }
    });
  }
}
