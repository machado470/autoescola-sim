import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1) limpa na ordem certa (filho -> pai)
  await prisma.studentAnswer.deleteMany().catch(() => {});
  await prisma.choice.deleteMany().catch(() => {});
  await prisma.question.deleteMany().catch(() => {});
  // não é obrigatório, mas se quiser limpar sessões:
  await prisma.examSession.deleteMany().catch(() => {});

  // 2) cria 1 pergunta de exemplo
  const question = await prisma.question.create({
    data: {
      statement: 'Qual o procedimento correto ao se aproximar de uma faixa de pedestres?',
      difficulty: Difficulty.EASY,
      imageUrl: null,
      tags: ['comportamento', 'trânsito'],
      choices: {
        create: [
          {
            text: 'Reduzir a velocidade e dar preferência ao pedestre.',
            isCorrect: true,
          },
          {
            text: 'Aumentar a velocidade para não atrapalhar o fluxo.',
            isCorrect: false,
          },
          {
            text: 'Buzinar para o pedestre atravessar rápido.',
            isCorrect: false,
          },
          {
            text: 'Ignorar a faixa se não houver semáforo.',
            isCorrect: false,
          },
        ],
      },
    },
  });

  console.log('Seed criado:', question.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
