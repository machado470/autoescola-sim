import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStudentStats(studentId: string) {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!student) return { xp: 0, categories: [] };

    const categories = await this.prisma.category.findMany({
      include: {
        phases: {
          include: {
            lessons: true,
            questions: true,
          },
        },
      },
    });

    const progress = await this.prisma.studentProgress.findMany({
      where: { userId: studentId },
    });

    const categoriesWithProgress = categories.map((cat) => {
      let total = 0;

      cat.phases.forEach((phase) => {
        const prog = progress.find((p) => p.phaseId === phase.id);
        if (!prog) return;

        const lessonPct =
          phase.lessons.length === 0
            ? 0
            : prog.lessonsCompleted / phase.lessons.length;

        const questionPct =
          phase.questions.length === 0
            ? 0
            : prog.correctAnswers / phase.questions.length;

        total += (lessonPct + questionPct) / 2;
      });

      const progressPercent =
        cat.phases.length === 0
          ? 0
          : Math.round((total / cat.phases.length) * 100);

      return {
        id: cat.id,
        name: cat.name,
        progress: progressPercent,
      };
    });

    return {
      xp: student.xp,
      categories: categoriesWithProgress,
    };
  }
}
