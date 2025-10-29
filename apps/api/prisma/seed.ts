/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function safeCreate(modelName: string, data: Record<string, any>) {
  const model = (prisma as any)[modelName]
  if (!model) { console.warn('[seed] Modelo "' + modelName + '" nao existe nesta branch - ignorando.'); return null }
  try {
    const created = await model.create({ data })
    const anyCreated: any = created as any
    const id = anyCreated?.id || anyCreated?.uuid || anyCreated?.email || 'ok'
    console.log('[seed] criado em ' + modelName + ':', id)
    return created
  } catch (e: any) {
    console.warn('[seed] falha ao criar em ' + modelName + ': ' + (e?.message || e))
    return null
  }
}
async function main() {
  console.log('=== Seed MV2: School / Instrutor / Aluno / Simulado ===')
  const school = await safeCreate('school', { name: 'AutoEscola Nova Era' })
  const instrutor = await safeCreate('instrutor', {
    name: 'Carlos Silva', email: 'carlos@autoescola.local',
    ...(school && (school as any).id ? { schoolId: (school as any).id } : {})
  })
  const aluno = await safeCreate('aluno', {
    name: 'Aluno Teste', email: 'aluno@autoescola.local',
    ...(school && (school as any).id ? { schoolId: (school as any).id } : {})
  })
  await safeCreate('simulado', {
    title: 'Simulado Inicial',
    ...(aluno && (aluno as any).id ? { alunoId: (aluno as any).id } : {}),
    ...(instrutor && (instrutor as any).id ? { instrutorId: (instrutor as any).id } : {})
  })
  console.log('=== Seed concluido ===')
}
main().then(async ()=>{ await prisma.$disconnect() }).catch(async (e)=>{ console.error(e); await prisma.$disconnect(); process.exit(1) })
