import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentLessons: true,
        studentProgress: true,
        attempts: true,
      },
    });

    if (!user) throw new NotFoundException('Aluno não encontrado');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      lessonsCompleted: user.studentLessons.length,
      phasesCompleted: user.studentProgress.filter(p => p.finished).length,
      attempts: user.attempts.length,
      bestScore:
        user.attempts.length > 0
          ? Math.max(...user.attempts.map(a => a.percentage))
          : 0,
    };
  }
}
