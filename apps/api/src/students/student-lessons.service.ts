import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsLessonsService {
  constructor(private prisma: PrismaService) {}

  async completeLesson(userId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { phase: true },
    });

    if (!lesson) {
      throw new NotFoundException('Aula não encontrada');
    }

    // Marca aula como concluída
    await this.prisma.studentLesson.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {},
      create: { userId, lessonId },
    });

    // Atualiza progresso da fase
    await this.prisma.studentProgress.upsert({
      where: { userId_phaseId: { userId, phaseId: lesson.phaseId } },
      update: { lessonsCompleted: { increment: 1 } },
      create: {
        userId,
        phaseId: lesson.phaseId,
        lessonsCompleted: 1,
        correctAnswers: 0,
      },
    });

    return { message: 'Aula concluída com sucesso' };
  }
}
