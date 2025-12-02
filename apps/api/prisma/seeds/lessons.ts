import { PrismaClient } from '@prisma/client';

export async function seedLessons(prisma: PrismaClient) {
  console.log('📘 Seeding: Lessons');

  const phases = await prisma.phase.findMany();

  for (const phase of phases) {
    await prisma.lesson.create({
      data: {
        phaseId: phase.id,
        title: `Introdução a ${phase.name}`,
        content: `Conteúdo inicial da fase "${phase.name}".`,
      },
    });
  }
}
