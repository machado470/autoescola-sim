import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.simulado.deleteMany()
  await prisma.instrutor.deleteMany()
  await prisma.aluno.deleteMany()

  const [
    anaSenhaHash,
    brunoSenhaHash,
    carlaSenhaHash,
    eduardoSenhaHash,
    fernandaSenhaHash,
  ] = await Promise.all(
    ['senhaAna123', 'senhaBruno123', 'senhaCarla123', 'senhaEdu123', 'senhaFer123'].map(
      (senha) => bcrypt.hash(senha, 10),
    ),
  )

  const alunos = await Promise.all([
    prisma.aluno.create({
      data: {
        nome: 'Ana Souza',
        cpf: '12345678901',
        email: 'ana.souza@example.com',
        senhaHash: anaSenhaHash,
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Bruno Lima',
        cpf: '23456789012',
        email: 'bruno.lima@example.com',
        senhaHash: brunoSenhaHash,
      },
    }),
    prisma.aluno.create({
      data: {
        nome: 'Carla Mendes',
        cpf: '34567890123',
        email: 'carla.mendes@example.com',
        senhaHash: carlaSenhaHash,
      },
    }),
  ])

  await Promise.all([
    prisma.instrutor.create({
      data: {
        nome: 'Eduardo Almeida',
        email: 'eduardo.almeida@example.com',
        senhaHash: eduardoSenhaHash,
        cnh: 'ABC1234567',
      },
    }),
    prisma.instrutor.create({
      data: {
        nome: 'Fernanda Ribeiro',
        email: 'fernanda.ribeiro@example.com',
        senhaHash: fernandaSenhaHash,
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
