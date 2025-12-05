import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStudentStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true },
    });

    const phases = await this.prisma.studentProgress.findMany({
      where: { userId },
    });

    // removido orderBy inexistente
    const categories = await this.prisma.category.findMany();

    return {
      xp: user?.xp ?? 0,
      categories: categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        progress: this.calculateCategoryProgress(cat.id, phases),
      })),
    };
  }

  private calculateCategoryProgress(categoryId: string, phases: any[]) {
    const related = phases.filter((p) =>
      p.phaseId.startsWith(categoryId)
    );

    if (related.length === 0) return 0;

    const completed = related.filter((p) => p.finished).length;

    return Math.round((completed / related.length) * 100);
  }
}
