import { Router } from 'express'

export const relatorios = Router()

relatorios.get('/relatorios/progresso', (req, res) => {
  void req.query.alunoId
  res.status(200).json({
    items: [],
    note:
      'placeholder v1; será preenchido após definição final de modelos de progresso teórico',
  })
})
