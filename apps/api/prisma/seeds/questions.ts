import { PrismaClient } from '@prisma/client';

export async function seedQuestions(prisma: PrismaClient) {
  console.log('❓ Seeding: Questions');

  const phases = await prisma.phase.findMany();

  for (const phase of phases) {
    await prisma.question.create({
      data: {
        statement: `Pergunta sobre ${phase.name}?`,
        optionA: 'Opção A',
        optionB: 'Opção B',
        optionC: 'Opção C',
        optionD: 'Opção D',
        correct: 'A',
        categoryId: phase.categoryId,
        phaseId: phase.id,
      },
    });
  }
}
