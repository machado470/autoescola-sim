import { PrismaClient, Difficulty } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // limpa na ordem certa (filho -> pai)
  await prisma.choice.deleteMany()
  await prisma.question.deleteMany()

  // cria 1 questão de exemplo
  await prisma.question.create({
    data: {
      statement: 'Qual o procedimento correto ao se aproximar de uma faixa de pedestres?',
      title: 'Comportamento na via',
      difficulty: Difficulty.EASY,
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
            text: 'Ignorar se estiver com pressa.',
            isCorrect: false,
          },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
