# AutoEscola Sim — Monorepo

Guia rápido:
- Requisitos: Node 20+, pnpm, PostgreSQL 15+.
- Instalação: `pnpm i`
- Backend: copie `.env.example` para `.env`, ajuste `DATABASE_URL`, rode migrações/seed e `pnpm --filter @aes/api dev`.
- Frontend: `pnpm --filter @aes/web dev`

Estrutura de conteúdo em `apps/web/src/data/tracks/**`. Use os schemas em `packages/content` para validar.

## Conteúdo AutoEscola Sim (v1 base)
- Manifesto da trilha e versões em `apps/web/src/data/tracks/aes/manifest.json`.
- Placeholders de currículos v1 a v7 em `apps/web/src/data/tracks/aes/versions/`.
- Utilize `loadAutoEscolaManifest` e `loadAutoEscolaVersion` (arquivo `apps/web/src/data/loaders.ts`) para ler os dados localmente.
