import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_URL = process.argv[2] || process.env.API_URL || 'http://localhost:3000'

async function main() {
  console.log('▶️ Iniciando teste de simulado...')
  console.log('API_URL =', API_URL)

  // 1) usuário
  let user = await prisma.user.findUnique({ where: { email: 'aluno@autoescola.local' } })
  if (!user) user = await prisma.user.findFirst()
  if (!user) throw new Error('Nenhum usuário encontrado no banco.')

  // 2) exam com perguntas/alternativas
  const exam = await prisma.exam.findFirst({
    include: {
      questions: {
        include: { question: { include: { choices: true } } },
        orderBy: { order: 'asc' },
      },
    },
  })
  if (!exam) throw new Error('Nenhum exam encontrado no banco.')

  // 3) iniciar attempt via API
  const startRes = await fetch(`${API_URL}/attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, examId: exam.id }),
  })
  if (!startRes.ok) throw new Error(`Falha ao iniciar attempt: ${startRes.status} ${await startRes.text()}`)
  const started = await startRes.json()
  const attemptId: string = started.id
  console.log('✅ Attempt iniciada:', attemptId)

  // 4) montar respostas (pega a correta; se não houver, pega a primeira)
  const answers = exam.questions.map((eq) => {
    const correct = eq.question.choices.find(c => c.isCorrect) || eq.question.choices[0]
    return { questionId: eq.question.id, choiceId: correct.id }
  })

  // 5) submeter e mostrar nota
  const submitRes = await fetch(`${API_URL}/attempts/${attemptId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
  if (!submitRes.ok) throw new Error(`Falha ao submeter attempt: ${submitRes.status} ${await submitRes.text()}`)
  const submitted = await submitRes.json()
  console.log('🎯 Resultado:\n', JSON.stringify({ attemptId, score: submitted.score }, null, 2))
}

main().catch((e) => { console.error('❌ Erro no teste:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
