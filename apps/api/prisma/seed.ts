/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function safeCreate(modelName: string, data: Record<string, any>) {
  const model = (prisma as any)[modelName]
  if (!model) {
    console.warn(\`[seed] Modelo "\${modelName}" não existe nesta branch — ignorando.\`)
    return null
  }
  try {
    const created = await model.create({ data })
    console.log(\`[seed] ✔ criado em \${modelName}:\`, created?.id ?? created)
    return created
  } catch (e: any) {
    console.warn(\`[seed] ⚠ falha ao criar em \${modelName}: \${e?.message ?? e}\`)
    return null
  }
}

async function main() {
  console.log('=== Seed MV2: School / Instrutor / Aluno / Simulado ===')

  const school = await safeCreate('school', {
    name: 'AutoEscola Nova Era',
  })

  const instrutor = await safeCreate('instrutor', {
    name: 'Carlos Silva',
    email: 'carlos@autoescola.local',
    ...(school?.id ? { schoolId: school.id } : {}),
  })

  const aluno = await safeCreate('aluno', {
    name: 'Aluno Teste',
    email: 'aluno@autoescola.local',
    ...(school?.id ? { schoolId: school.id } : {}),
  })

  const simulado = await safeCreate('simulado', {
    title: 'Simulado Inicial',
    ...(aluno?.id ? { alunoId: aluno.id } : {}),
    ...(instrutor?.id ? { instrutorId: instrutor.id } : {}),
  })

  console.log('=== Seed concluído ===', {
    school: !!school, instrutor: !!instrutor, aluno: !!aluno, simulado: !!simulado,
  })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
