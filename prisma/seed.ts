import { PrismaClient, Difficulty } from '@prisma/client'
const prisma = new PrismaClient()

type ChoiceData = { text: string; isCorrect: boolean }

const QUESTION_1 = {
  statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
  difficulty: Difficulty.EASY,
}
const CHOICES_1: ChoiceData[] = [
  { text: 'O motorista deve reduzir a velocidade', isCorrect: false },
  { text: 'O motorista deve parar o veículo',      isCorrect: true  },
  { text: 'Proibido seguir em frente',             isCorrect: false },
  { text: 'Preferência de passagem',               isCorrect: false },
]

async function insertChoices(questionId: number) {
  // Tenta variações comuns de FK e nome do modelo
  const fkCandidates = ['questionId', 'questionID', 'question_id']
  const model = (prisma as any).choice // já vimos que existe prisma.choice no seu projeto

  for (const fk of fkCandidates) {
    try {
      const data = CHOICES_1.map(c => ({ ...c, [fk]: questionId } as any))
      await model.createMany({ data })
      console.log(`✓ Choices inseridos usando FK "${fk}"`)
      return
    } catch (e) {
      // tenta a próxima variação
    }
  }
  throw new Error('Não foi possível inserir choices: nenhuma variação de FK funcionou (questionId/questionID/question_id).')
}

async function main() {
  console.log('🌱 Iniciando seed do AutoEscola-Sim...')

  // limpeza em ordem (filhos -> pai)
  try { await (prisma as any).choice.deleteMany() } catch {}
  try { await (prisma as any).question.deleteMany() } catch {}

  // cria a questão SEM nested create (evita conflito de nome do relation field)
  const q1 = await (prisma as any).question.create({
    data: {
      statement: QUESTION_1.statement,
      difficulty: QUESTION_1.difficulty,
    },
  })
  console.log(`✓ Pergunta criada (id=${q1.id})`)

  await insertChoices(q1.id)

  console.log('✅ Seed concluído com sucesso.')
}

main()
  .catch((e) => { console.error('❌ Erro no seed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
