import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

type StartAttemptDto = { userId: string; examId: string }
type SubmitAttemptDto = { answers: { questionId: string; choiceId: string }[] }

@Injectable()
export class AttemptService {
  constructor(private prisma: PrismaService) {}

  async start({ userId, examId }: StartAttemptDto) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: { include: { question: true }, orderBy: { order: 'asc' } } },
    })
    if (!exam) throw new NotFoundException('Exam not found')

    return this.prisma.attempt.create({
      data: { userId, examId },
      include: { exam: true },
    })
  }

  async submit(attemptId: string, payload: SubmitAttemptDto) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id: attemptId },
      include: { exam: { include: { questions: { include: { question: { include: { choices: true } } } } } } },
    })
    if (!attempt) throw new NotFoundException('Attempt not found')
    if (attempt.submittedAt) throw new BadRequestException('Already submitted')

    // salvar respostas
    for (const a of payload.answers) {
      await this.prisma.attemptAnswer.upsert({
        where: { attemptId_questionId: { attemptId, questionId: a.questionId } },
        create: { attemptId, questionId: a.questionId, choiceId: a.choiceId },
        update: { choiceId: a.choiceId },
      })
    }

    // calcular nota
    const saved = await this.prisma.attemptAnswer.findMany({
      where: { attemptId },
      include: { choice: true },
    })
    const correct = saved.filter(s => s.choice.isCorrect).length
    const total = attempt.exam.questions.length || 1
    const score = Math.round((correct / total) * 100)

    return this.prisma.attempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(), score },
      include: { answers: true },
    })
  }
}
