import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.info('🌱 Seeding dados básicos v1...')

  const devPassword = '123456' // senha dev apenas
  const adminPasswordHash = await bcrypt.hash(devPassword, 10)

  const admin = await prisma.instrutor.upsert({
    where: { email: 'admin@aes.com' },
    update: {
      nome: 'Administrador',
      senhaHash: adminPasswordHash,
    },
    create: {
      nome: 'Administrador',
      email: 'admin@aes.com',
      senhaHash: adminPasswordHash,
      cnh: null,
    },
  })
  console.info(`✅ Admin dev garantido (${admin.email}).`)

  const alunoPasswordHash = await bcrypt.hash(devPassword, 10)
  const alunoDemo = await prisma.aluno.upsert({
    where: { cpf: '00011122233' },
    update: {
      nome: 'Aluno Demo',
      email: 'aluno.demo@aes.com',
      senhaHash: alunoPasswordHash,
    },
    create: {
      nome: 'Aluno Demo',
      cpf: '00011122233',
      email: 'aluno.demo@aes.com',
      senhaHash: alunoPasswordHash,
    },
  })
  console.info(`✅ Aluno demo pronto (${alunoDemo.email}).`)

  const instrutorPasswordHash = await bcrypt.hash(devPassword, 10)
  const instrutorDemo = await prisma.instrutor.upsert({
    where: { email: 'instrutor.demo@aes.com' },
    update: {
      nome: 'Instrutor Demo',
      senhaHash: instrutorPasswordHash,
      cnh: '99988877766',
    },
    create: {
      nome: 'Instrutor Demo',
      email: 'instrutor.demo@aes.com',
      senhaHash: instrutorPasswordHash,
      cnh: '99988877766',
    },
  })
  console.info(`✅ Instrutor demo pronto (${instrutorDemo.email}).`)

  const prismaAny = prisma as PrismaClient & Record<string, any>
  const aulaModel = prismaAny.aula

  if (aulaModel && typeof aulaModel.findFirst === 'function') {
    try {
      const existingAula = await aulaModel.findFirst({
        where: {
          alunoId: alunoDemo.id,
          instrutorId: instrutorDemo.id,
        },
      })

      if (!existingAula) {
        const aulaDate = new Date()
        await aulaModel.create({
          data: {
            alunoId: alunoDemo.id,
            instrutorId: instrutorDemo.id,
            data: aulaDate,
          },
        })
        console.info('✅ Aula prática demo criada.')
      } else {
        console.info('ℹ️  Aula prática demo já existente, mantendo registro.')
      }
    } catch (error) {
      console.warn(
        '⚠️  Não foi possível criar aula prática demo automaticamente; verifique o schema antes de rodar novamente.',
        error instanceof Error ? error.message : error,
      )
    }
  } else {
    console.info('ℹ️  Modelo Aula não encontrado; pulando criação de aula prática.')
  }

  console.info('🌱 Seed finalizado.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro durante seed v1:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
