import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================================================
  // DASHBOARD DO ALUNO
  // ==================================================
  async getDashboard(studentId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: studentId },
    });

    if (!user) throw new NotFoundException('Aluno não encontrado');

    const phases = await this.prisma.phase.findMany({
      include: {
        lessons: true,
        questions: true,
      },
    });

    const progress = await this.prisma.studentProgress.findMany({
      where: { userId: studentId },
    });

    const phasesWithData = phases.map((phase) => {
      const p = progress.find((x) => x.phaseId === phase.id);

      const totalLessons = phase.lessons.length;
      const totalQuestions = phase.questions.length;
      const totalItems = totalLessons + totalQuestions;

      const lessonsCompleted = p?.lessonsCompleted ?? 0;
      const correctAnswers = p?.correctAnswers ?? 0;
      const completed = lessonsCompleted + correctAnswers;

      const percent =
        totalItems > 0 ? Math.min((completed / totalItems) * 100, 100) : 0;

      return {
        id: phase.id,
        name: phase.name,
        totalLessons,
        totalQuestions,
        totalItems,
        lessonsCompleted,
        correctAnswers,
        completed,
        percent,
      };
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        xp: user.xp,
      },
      phases: phasesWithData,
    };
  }

  // ==================================================
  // FASE COMPLETA DO ALUNO
  // ==================================================
  async getFaseAluno(studentId: string, phaseId: string) {
    const phase = await this.prisma.phase.findUnique({
      where: { id: phaseId },
      include: {
        lessons: true,
        questions: true,
      },
    });

    if (!phase) throw new NotFoundException('Fase não encontrada');

    const progress = await this.prisma.studentProgress.findFirst({
      where: { userId: studentId, phaseId },
    });

    const lessons = phase.lessons.map((lesson, index) => ({
      id: lesson.id,
      title: lesson.title,
      completed: progress ? index < progress.lessonsCompleted : false,
    }));

    const questions = phase.questions.map((q, index) => ({
      id: q.id,
      answered: progress ? index < progress.correctAnswers : false,
    }));

    return {
      id: phase.id,
      name: phase.name,
      lessons,
      questions,
    };
  }

  // ==================================================
  // 🔥 CONCLUIR AULA
  // ==================================================
  async concluirAula(studentId: string, phaseId: string, lessonIndex: number) {
    let progress = await this.prisma.studentProgress.findFirst({
      where: { userId: studentId, phaseId },
    });

    if (!progress) {
      progress = await this.prisma.studentProgress.create({
        data: {
          userId: studentId,
          phaseId,
        },
      });
    }

    const newCount = Math.max(progress.lessonsCompleted, lessonIndex + 1);

    await this.prisma.studentProgress.update({
      where: { id: progress.id },
      data: { lessonsCompleted: newCount },
    });

    await this.incrementXP(studentId, 10);

    return this.getFaseAluno(studentId, phaseId);
  }

  // ==================================================
  // 🔥 RESPONDER QUESTÃO
  // ==================================================
  async responderQuestao(
    studentId: string,
    phaseId: string,
    questionIndex: number,
  ) {
    let progress = await this.prisma.studentProgress.findFirst({
      where: { userId: studentId, phaseId },
    });

    if (!progress) {
      progress = await this.prisma.studentProgress.create({
        data: {
          userId: studentId,
          phaseId,
        },
      });
    }

    const newCorrect = Math.max(progress.correctAnswers, questionIndex + 1);

    await this.prisma.studentProgress.update({
      where: { id: progress.id },
      data: { correctAnswers: newCorrect },
    });

    await this.incrementXP(studentId, 5);

    return this.getFaseAluno(studentId, phaseId);
  }

  // ==================================================
  // UTILITÁRIO — DAR XP AO ALUNO
  // ==================================================
  async incrementXP(userId: string, amount: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: amount },
      },
    });
  }
}
