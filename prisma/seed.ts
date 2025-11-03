import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1) limpa respostas dependentes primeiro
  await prisma.studentAnswer.deleteMany().catch(() => {});

  // 2) limpa perguntas
  await prisma.question.deleteMany();

  // 3) cria uma pergunta de exemplo
  await prisma.question.create({
    data: {
      statement: 'Qual o procedimento correto ao se aproximar de uma faixa de pedestres?',
      imageUrl: null,
      tags: ['comportamento', 'trânsito'],
      // 👇 o campo que estava faltando
      difficulty: Difficulty.EASY,
      answers: {
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
