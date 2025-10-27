import { PrismaClient, Difficulty } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do AutoEscola-Sim...')

  const password = await bcrypt.hash('123456', 10)

  // 👨‍🏫 Admin
  await prisma.instrutor.upsert({
    where: { email: 'admin@aes.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@aes.com',
      senhaHash: password,
      cnh: '00000000000',
    },
  })

  // 👩‍🎓 Aluno
  await prisma.aluno.upsert({
    where: { email: 'aluno@autoescola.local' },
    update: {},
    create: {
      nome: 'Aluno Teste',
      cpf: '00000000000',
      email: 'aluno@autoescola.local',
      senhaHash: password,
    },
  })

  // 🚦 Questões exemplo
  await prisma.question.upsert({
    where: { id: 'seed-q1' },
    update: {},
    create: {
      id: 'seed-q1',
      statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
      difficulty: Difficulty.EASY,
      tags: ['sinalizacao', 'regulamentacao'],
      choices: {
        create: [
          { text: 'Obrigatório parar antes de prosseguir', isCorrect: true },
          { text: 'Velocidade máxima de 30 km/h', isCorrect: false },
          { text: 'Proibido estacionar', isCorrect: false },
          { text: 'Preferência ao tráfego da direita', isCorrect: false },
        ],
      },
    },
  })

  await prisma.question.upsert({
    where: { id: 'seed-q2' },
    update: {},
    create: {
      id: 'seed-q2',
      statement: 'Qual deve ser a atitude ao ver uma placa “Curva Acentuada à Direita”?',
      difficulty: Difficulty.EASY,
      tags: ['sinalizacao', 'advertencia'],
      choices: {
        create: [
          { text: 'Aumentar a velocidade', isCorrect: false },
          { text: 'Manter a trajetória e reduzir a velocidade', isCorrect: true },
          { text: 'Ultrapassar o veículo da frente', isCorrect: false },
          { text: 'Ligar o pisca-alerta', isCorrect: false },
        ],
      },
    },
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log('Usuários de teste:')
  console.log('  Admin  → admin@aes.com / 123456')
  console.log('  Aluno  → aluno@autoescola.local / 123456')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
