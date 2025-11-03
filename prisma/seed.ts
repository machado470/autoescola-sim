import { PrismaClient } from '@prisma/client'

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/autoescola?schema=public'
console.log('🌱 Seed conectando a:', databaseUrl)

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

async function main() {
  // Apagar dados antigos
  await prisma.choice.deleteMany()
  await prisma.question.deleteMany()

  // Inserir dados iniciais
  await prisma.question.create({
    data: {
      title: 'Exemplo de questão',
      choices: {
        create: [
          { text: 'Alternativa A', isCorrect: false },
          { text: 'Alternativa B', isCorrect: true },
          { text: 'Alternativa C', isCorrect: false }
        ]
      }
    }
  })

  console.log('✅ Seed executado com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
