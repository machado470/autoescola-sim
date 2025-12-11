import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async getLessonsByPhase(categoryId: string, phaseId: string) {
    const phase = await this.prisma.phase.findFirst({
      where: { id: phaseId, categoryId },
    });

    if (!phase) {
      throw new NotFoundException("Fase não encontrada para esta categoria.");
    }

    return this.prisma.lesson.findMany({
      where: { phaseId, categoryId },
      orderBy: { order: "asc" },
    });
  }
}
