import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do AutoEscola-Sim (Questions/Choices)...')

  await prisma.choice.deleteMany()
  await prisma.question.deleteMany()

  await prisma.question.create({
    data: {
      statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
      choices: {
        create: [
          { text: 'O motorista deve reduzir a velocidade', isCorrect: false },
          { text: 'O motorista deve parar o veículo', isCorrect: true },
          { text: 'Proibido seguir em frente', isCorrect: false },
          { text: 'Preferência de passagem', isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      statement: 'Qual é o limite de álcool por litro de sangue permitido?',
      choices: {
        create: [
          { text: '0,6 g/L', isCorrect: false },
          { text: '0,2 g/L', isCorrect: false },
          { text: '0,0 g/L (lei seca)', isCorrect: true },
          { text: '1,0 g/L', isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.create({
    data: {
      statement: 'Ao se aproximar de uma faixa de pedestres sem semáforo, você deve:',
      choices: {
        create: [
          { text: 'Aumentar a velocidade para ultrapassar', isCorrect: false },
          { text: 'Manter a velocidade e buzinar', isCorrect: false },
          { text: 'Reduzir e dar preferência ao pedestre', isCorrect: true },
          { text: 'Parar somente se houver agente de trânsito', isCorrect: false },
        ],
      },
    },
  })

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
