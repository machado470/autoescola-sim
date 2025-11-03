import { PrismaClient, Difficulty } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.studentAnswer.deleteMany().catch(() => {});
  await prisma.question.deleteMany();
  await prisma.examSession.deleteMany().catch(() => {}); // se o modelo existir

  // cria uma sessão de exame fictícia
  const session = await prisma.examSession.create({
    data: {
      name: 'Sessão de Exemplo',
      description: 'Sessão inicial de testes',
    },
  });

  // cria pergunta vinculada à sessão
  await prisma.question.create({
    data: {
      statement: 'Qual o procedimento correto ao se aproximar de uma faixa de pedestres?',
      imageUrl: null,
      tags: ['comportamento', 'trânsito'],
      difficulty: Difficulty.EASY,
      examSession: { connect: { id: session.id } }, // 👈 o vínculo que faltava
      answers: {
        create: [
          { text: 'Reduzir a velocidade e dar preferência ao pedestre.', isCorrect: true },
          { text: 'Aumentar a velocidade para não atrapalhar o fluxo.', isCorrect: false },
          { text: 'Buzinar para o pedestre atravessar rápido.', isCorrect: false },
          { text: 'Ignorar a faixa se não houver semáforo.', isCorrect: false },
        ],
      },
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
