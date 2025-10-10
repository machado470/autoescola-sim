import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.simulado.deleteMany()
  await prisma.instrutor.deleteMany()
  await prisma.aluno.deleteMany()

  const alunos = await Promise.all([
    prisma.aluno.create({
      data: {
        nome: 'Ana Souza',
        cpf: '12345678901',
        email: 'ana.souza@example.com',
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Bruno Lima',
        cpf: '23456789012',
        email: 'bruno.lima@example.com',
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Carla Mendes',
        cpf: '34567890123',
      },
    }),
  ])

  await Promise.all([
    prisma.instrutor.create({
      data: {
        nome: 'Eduardo Almeida',
        cnh: 'ABC1234567',
      },
    }),
    prisma.instrutor.create({
      data: {
        nome: 'Fernanda Ribeiro',
        cnh: 'XYZ9876543',
      },
    }),
  ])

  await Promise.all([
    prisma.simulado.create({
      data: {
        alunoId: alunos[0].id,
        acertos: 18,
        totalQuestoes: 20,
      },
    }),
    prisma.simulado.create({
      data: {
        alunoId: alunos[1].id,
        acertos: 15,
        totalQuestoes: 20,
      },
    }),
    prisma.simulado.create({
      data: {
        alunoId: alunos[2].id,
        acertos: 20,
        totalQuestoes: 20,
      },
    }),
  ])
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
