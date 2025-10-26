import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/common/prisma.service'
import { ExamStatus } from '@prisma/client'

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async start(metadata?: Record<string, any>) {
    const session = await this.prisma.examSession.create({
      data: {
        status: ExamStatus.IN_PROGRESS,
        startedAt: new Date(),
        metadata: metadata ?? {},
      },
    })
    return session
  }

  async answer(examSessionId: string, questionId: string, choiceId: string) {
    // valida sessão
    const session = await this.prisma.examSession.findUnique({ where: { id: examSessionId } })
    if (!session) throw new NotFoundException('Exam session not found')
    if (session.status !== 'IN_PROGRESS') throw new BadRequestException('Exam is not in progress')

    // valida choice pertence à question e pegue se é correta
    const choice = await this.prisma.choice.findFirst({
      where: { id: choiceId, questionId },
      select: { id: true, isCorrect: true },
    })
    if (!choice) throw new BadRequestException('Choice does not belong to Question')

    // upsert da resposta (uma por questão na sessão)
    const answer = await this.prisma.studentAnswer.upsert({
      where: { examSessionId_questionId: { examSessionId, questionId } },
      update: { choiceId: choice.id, isCorrect: choice.isCorrect, answeredAt: new Date() },
      create: {
        examSessionId,
        questionId,
        choiceId: choice.id,
        isCorrect: choice.isCorrect,
      },
      include: {
        question: { select: { statement: true } },
        choice: { select: { text: true, isCorrect: true } },
      },
    })

    return { ok: true, answer }
  }

  async finish(examSessionId: string) {
    const session = await this.prisma.examSession.findUnique({ where: { id: examSessionId } })
    if (!session) throw new NotFoundException('Exam session not found')

    // calcula totais com base nas respostas
    const [totalQuestions, correctAnswers] = await Promise.all([
      this.prisma.studentAnswer.count({ where: { examSessionId } }),
      this.prisma.studentAnswer.count({ where: { examSessionId, isCorrect: true } }),
    ])

    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0

    const updated = await this.prisma.examSession.update({
      where: { id: examSessionId },
      data: {
        status: ExamStatus.FINISHED,
        finishedAt: new Date(),
        totalQuestions,
        correctAnswers,
        score,
      },
    })

    return updated
  }

  async getById(id: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: { select: { id: true, statement: true, difficulty: true } },
            choice: { select: { id: true, text: true, isCorrect: true } },
          },
        },
      },
    })
    if (!session) throw new NotFoundException('Exam session not found')
    return session
  }
}
