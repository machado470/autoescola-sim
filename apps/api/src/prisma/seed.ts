import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.create({
    data: {
      name: 'A',
    },
  });

  const phase = await prisma.phase.create({
    data: {
      name: 'Fase 1',
      order: 1,
      categoryId: category.id,
    },
  });

  await prisma.question.create({
    data: {
      statement: 'Exemplo de pergunta',
      optionA: 'A',
      optionB: 'B',
      optionC: 'C',
      optionD: 'D',
      correct: 'A',
      categoryId: category.id,
      phaseId: phase.id,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
