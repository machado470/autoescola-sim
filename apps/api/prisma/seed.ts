import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.simulado.deleteMany()

  const alunos = await Promise.all(
    [
      {
        nome: 'Aluno Padrão',
        cpf: '00000000000',
        email: 'aluno@aes.com',
        senha: '123456',
      },
      {
        nome: 'Ana Souza',
        cpf: '12345678901',
        email: 'ana.souza@example.com',
        senha: 'senhaAna123',
      },
      {
        nome: 'Bruno Lima',
        cpf: '23456789012',
        email: 'bruno.lima@example.com',
        senha: 'senhaBruno123',
      },
      {
        nome: 'Carla Mendes',
        cpf: '34567890123',
        email: 'carla.mendes@example.com',
        senha: 'senhaCarla123',
      },
    ].map(async ({ senha, ...aluno }) => {
      const senhaHash = await bcrypt.hash(senha, 10)
      return prisma.aluno.upsert({
        where: { email: aluno.email },
        update: {
          nome: aluno.nome,
          cpf: aluno.cpf,
          senhaHash,
        },
        create: {
          ...aluno,
          senhaHash,
        },
      })
    }),
  )

  await Promise.all(
    [
      {
        nome: 'Administrador',
        email: 'admin@aes.com',
        senha: '123456',
        cnh: null,
      },
      {
        nome: 'Eduardo Almeida',
        email: 'eduardo.almeida@example.com',
        senha: 'senhaEdu123',
        cnh: 'ABC1234567',
      },
      {
        nome: 'Fernanda Ribeiro',
        email: 'fernanda.ribeiro@example.com',
        senha: 'senhaFer123',
        cnh: 'XYZ9876543',
      },
    ].map(async ({ senha, ...instrutor }) => {
      const senhaHash = await bcrypt.hash(senha, 10)
      return prisma.instrutor.upsert({
        where: { email: instrutor.email },
        update: {
          nome: instrutor.nome,
          cnh: instrutor.cnh,
          senhaHash,
        },
        create: {
          ...instrutor,
          senhaHash,
        },
      })
    }),
  )

  const alunosPorEmail = new Map(alunos.map((aluno) => [aluno.email, aluno]))

  const simuladosData = [
    {
      email: 'ana.souza@example.com',
      acertos: 18,
      totalQuestoes: 20,
    },
    {
      email: 'bruno.lima@example.com',
      acertos: 15,
      totalQuestoes: 20,
    },
    {
      email: 'carla.mendes@example.com',
      acertos: 20,
      totalQuestoes: 20,
    },
  ]

  for (const simulado of simuladosData) {
    const aluno = alunosPorEmail.get(simulado.email)
    if (!aluno) {
      continue
    }

    await prisma.simulado.create({
      data: {
        alunoId: aluno.id,
        acertos: simulado.acertos,
        totalQuestoes: simulado.totalQuestoes,
      },
    })
  }
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
