# AutoEscola Sim — Monorepo

Guia rápido:
- Requisitos: Node 20+, pnpm, PostgreSQL 15+.
- Instalação: `pnpm i`
- Backend: copie `.env.example` para `.env`, ajuste `DATABASE_URL`, rode migrações/seed e `pnpm --filter @aes/api dev`.
- Frontend: `pnpm --filter @aes/web dev`

Estrutura de conteúdo em `apps/web/src/data/tracks/**`. Use os schemas em `packages/content` para validar.
