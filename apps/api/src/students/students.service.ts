import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProgress: true,
        studentLessons: true,
        simulados: true,
      },
    });

    if (!user) return null;

    return {
      name: user.name,
      lessonsCompleted: user.studentLessons.length,
      correctAnswers: user.studentProgress.reduce(
        (sum, p) => sum + p.correctAnswers,
        0
      ),
      totalQuestions: await this.prisma.question.count(),
      lastSimulations: user.simulados.slice(0, 5),
    };
  }
}
