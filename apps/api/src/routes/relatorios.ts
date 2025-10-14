import { AulaStatus, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { promises as fs } from 'node:fs'
import { resolve, join } from 'node:path'

export const relatorios = Router()

function createPrismaClient(): PrismaClient | null {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)
  const skipConnect =
    process.env.PRISMA_SKIP_CONNECT?.toLowerCase() === 'true'

  if (!hasDatabaseUrl || skipConnect) {
    return null
  }

  try {
    return new PrismaClient()
  } catch (error) {
    console.warn('Não foi possível inicializar PrismaClient para relatórios.', error)
    return null
  }
}

const prisma = createPrismaClient()

let cachedTeoricoItems: string[] | null = null

async function loadTeoricoItemIds(): Promise<string[]> {
  if (cachedTeoricoItems) {
    return cachedTeoricoItems
  }

  const baseDirs = [
    process.env.TEORICO_CURRICULUM_ROOT
      ? resolve(process.env.TEORICO_CURRICULUM_ROOT)
      : null,
    resolve(process.cwd(), '..', 'web', 'src', 'data', 'tracks', 'aes', 'versions'),
    resolve(__dirname, '..', '..', '..', 'web', 'src', 'data', 'tracks', 'aes', 'versions'),
  ].filter((dir): dir is string => Boolean(dir))

  const itemIds = new Set<string>()

  for (const baseDir of baseDirs) {
    try {
      const versionDirs = await fs.readdir(baseDir, { withFileTypes: true })

      for (const dirent of versionDirs) {
        if (!dirent.isDirectory()) {
          continue
        }

        const curriculumPath = join(baseDir, dirent.name, 'curriculum.json')
        try {
          const file = await fs.readFile(curriculumPath, 'utf-8')
          const data = JSON.parse(file) as {
            modules?: Array<{
              lessons?: Array<{ id?: unknown }>
            }>
          }

          const modules = Array.isArray(data.modules) ? data.modules : []
          for (const module of modules) {
            const lessons = Array.isArray(module.lessons) ? module.lessons : []
            for (const lesson of lessons) {
              if (lesson && typeof lesson.id === 'string' && lesson.id.trim().length > 0) {
                itemIds.add(lesson.id.trim())
              }
            }
          }
        } catch (error) {
          console.warn(
            `Falha ao ler currículo teórico em ${curriculumPath}:`,
            error instanceof Error ? error.message : error,
          )
        }
      }

      if (itemIds.size > 0) {
        break
      }
    } catch (error) {
      console.info(
        `Diretório de currículos teóricos indisponível (${baseDir}):`,
        error instanceof Error ? error.message : error,
      )
    }
  }

  cachedTeoricoItems = Array.from(itemIds)
  return cachedTeoricoItems
}

relatorios.get('/relatorios/progresso', async (req, res) => {
  const alunoIdQuery =
    typeof req.query.alunoId === 'string' && req.query.alunoId.trim().length > 0
      ? req.query.alunoId.trim()
      : undefined

  if (!prisma) {
    res.status(200).json([])
    return
  }

  try {
    const alunos = await prisma.aluno.findMany({
      where: alunoIdQuery ? { id: alunoIdQuery } : undefined,
      select: {
        id: true,
        nome: true,
      },
      orderBy: { nome: 'asc' },
    })

    if (alunos.length === 0) {
      res.status(200).json([])
      return
    }

    const [teoricoGroupResult, aulasGroupResult, teoricoItems] = await Promise.all([
      prisma.progressoTeorico
        .groupBy({
          by: ['alunoId'],
          _count: { _all: true },
          where: alunoIdQuery ? { alunoId: alunoIdQuery } : undefined,
        })
        .catch((error) => {
          console.warn(
            'Falha ao agrupar progresso teórico:',
            error instanceof Error ? error.message : error,
          )
          return [] as Array<{ alunoId: string; _count: { _all: number } }>
        }),
      prisma.aula
        .groupBy({
          by: ['alunoId'],
          _count: { _all: true },
          where: {
            status: { not: AulaStatus.CANCELADA },
            ...(alunoIdQuery ? { alunoId: alunoIdQuery } : {}),
          },
        })
        .catch((error) => {
          console.warn(
            'Falha ao agrupar aulas práticas:',
            error instanceof Error ? error.message : error,
          )
          return [] as Array<{ alunoId: string; _count: { _all: number } }>
        }),
      loadTeoricoItemIds().catch((error) => {
        console.warn(
          'Não foi possível carregar itens teóricos:',
          error instanceof Error ? error.message : error,
        )
        return [] as string[]
      }),
    ])

    const teoricoCountByAluno = new Map<string, number>()
    for (const item of teoricoGroupResult) {
      teoricoCountByAluno.set(item.alunoId, item._count._all ?? 0)
    }

    const aulasCountByAluno = new Map<string, number>()
    for (const item of aulasGroupResult) {
      aulasCountByAluno.set(item.alunoId, item._count._all ?? 0)
    }

    let totalTeoricoItens = teoricoItems.length

    if (totalTeoricoItens === 0) {
      try {
        const fallbackItems = await prisma.progressoTeorico.findMany({
          select: { itemId: true },
          distinct: ['itemId'],
        })
        totalTeoricoItens = fallbackItems.length
      } catch (error) {
        console.info(
          'Itens teóricos não encontrados no currículo ou base; usando zero como total.',
          error instanceof Error ? error.message : error,
        )
      }
    }

    const payload = alunos.map((aluno) => {
      const teoricoConcluidos = teoricoCountByAluno.get(aluno.id) ?? 0
      const aulasConcluidas = aulasCountByAluno.get(aluno.id) ?? 0
      const teoricoPctRaw =
        totalTeoricoItens > 0 ? teoricoConcluidos / totalTeoricoItens : 0
      const teoricoPctNormalizado = Math.min(
        Math.max(teoricoPctRaw, 0),
        1,
      )
      const teoricoPct = Number.isFinite(teoricoPctNormalizado)
        ? Number(teoricoPctNormalizado.toFixed(4))
        : 0

      return {
        alunoId: aluno.id,
        nome: aluno.nome,
        teoricoPct,
        aulasPraticas: aulasConcluidas,
      }
    })

    res.status(200).json(payload)
  } catch (error) {
    console.warn(
      'Falha ao montar relatório de progresso:',
      error instanceof Error ? error.message : error,
    )
    res.status(200).json([])
  }
})
