import { Router } from 'express'

export const health = Router()

health.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, ts: new Date().toISOString() })
})
