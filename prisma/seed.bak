import { PrismaClient, Difficulty } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Apagar dados antigos
  await prisma.choice.deleteMany()
  await prisma.question.deleteMany()
  await prisma.simulator.deleteMany()
  await prisma.instructor.deleteMany()
  await prisma.school.deleteMany()

  // Criar escola e instrutores
  const school = await prisma.school.create({
    data: {
      name: 'Auto Escola Machado',
      city: 'Tijucas',
      state: 'SC',
    },
  })

  const instructor = await prisma.instructor.create({
    data: {
      name: 'Carlos Silva',
      license: 'AB',
      schoolId: school.id,
    },
  })

  // Criar questões de simulado
  const q1 = await prisma.question.create({
    data: {
      statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
      difficulty: Difficulty.EASY,
      choices: {
        create: [
          { text: 'Pare o veículo e siga somente quando for seguro', isCorrect: true },
          { text: 'Proibido estacionar', isCorrect: false },
          { text: 'Dê a preferência', isCorrect: false },
          { text: 'Siga em frente com atenção', isCorrect: false },
        ],
      },
    },
  })

  const q2 = await prisma.question.create({
    data: {
      statement: 'Qual é a velocidade máxima permitida em uma via urbana sem sinalização?',
      difficulty: Difficulty.MEDIUM,
      choices: {
        create: [
          { text: '50 km/h', isCorrect: true },
          { text: '40 km/h', isCorrect: false },
          { text: '60 km/h', isCorrect: false },
          { text: '30 km/h', isCorrect: false },
        ],
      },
    },
  })

  const q3 = await prisma.question.create({
    data: {
      statement: 'Qual documento o condutor deve portar obrigatoriamente ao dirigir?',
      difficulty: Difficulty.EASY,
      choices: {
        create: [
          { text: 'CNH (Carteira Nacional de Habilitação)', isCorrect: true },
          { text: 'Título de eleitor', isCorrect: false },
          { text: 'CPF', isCorrect: false },
          { text: 'Carteira de trabalho', isCorrect: false },
        ],
      },
    },
  })

  console.log('✅ Seed inserido com sucesso!')
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
