import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.phase.findMany({
      include: { questions: true },
      orderBy: { order: "asc" },
    });
  }
}
