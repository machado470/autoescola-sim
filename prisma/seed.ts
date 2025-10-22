import { PrismaClient, Difficulty } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Usuário de teste
  const user = await prisma.user.upsert({
    where: { email: 'aluno@autoescola.local' },
    update: {},
    create: {
      email: 'aluno@autoescola.local',
      name: 'Aluno Teste',
    },
  })

  // Questões
  const q1 = await prisma.question.create({
    data: {
      statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
      difficulty: Difficulty.EASY,
      choices: {
        create: [
          { text: 'Dê a preferência sem parar', isCorrect: false },
          { text: 'Parada obrigatória antes de prosseguir', isCorrect: true },
          { text: 'Velocidade máxima 30 km/h', isCorrect: false },
          { text: 'Área escolar', isCorrect: false },
        ],
      },
    },
  })

  const q2 = await prisma.question.create({
    data: {
      statement: 'Em vias molhadas, a distância de frenagem tende a…',
      difficulty: Difficulty.MEDIUM,
      choices: {
        create: [
          { text: 'Diminuir', isCorrect: false },
          { text: 'Aumentar', isCorrect: true },
          { text: 'Permanecer igual', isCorrect: false },
          { text: 'Não há relação', isCorrect: false },
        ],
      },
    },
  })

  // Simulado
  const exam = await prisma.exam.create({
    data: {
      title: 'Simulado Básico de Sinalização',
      durationMin: 10,
      questions: {
        create: [
          { questionId: q1.id, order: 1 },
          { questionId: q2.id, order: 2 },
        ],
      },
    },
  })

  console.log('✅ Seed finalizado com sucesso!')
  console.log({ user, exam })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
