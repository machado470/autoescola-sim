import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/questions', async (_req, res) => {
  try {
    const questions = await prisma.question.findMany({
      
      orderBy: { createdAt: 'asc' }
    })
    res.json(questions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to list questions' })
  }
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
