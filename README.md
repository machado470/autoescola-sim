# AutoEscola Sim — Monorepo

Guia rápido:
- Requisitos: Node 20+, pnpm, PostgreSQL 15+.
- Instalação: `pnpm i`
- Backend: copie `.env.example` para `.env`, ajuste `DATABASE_URL`, rode migrações/seed e `pnpm --filter @aes/api dev`.
- Frontend: `pnpm --filter @autoescola/web dev`

## Acesso de testes

- Login administrador: `admin@aes.com`
- Senha: `123456`

Estrutura de conteúdo em `apps/web/src/data/tracks/**`. Use os schemas em `packages/content` para validar.

## Conteúdo AutoEscola Sim (v1 base)
- Manifesto da trilha e versões em `apps/web/src/data/tracks/aes/manifest.json`.
- Placeholders de currículos v1 a v7 em `apps/web/src/data/tracks/aes/versions/`.
- Utilize `loadAutoEscolaManifest` e `loadAutoEscolaVersion` (arquivo `apps/web/src/data/loaders.ts`) para ler os dados localmente.

## UI responsiva & temas

- O frontend utiliza Tailwind CSS com tokens de cor em `apps/web/src/index.css` e modo escuro ativado por classe (`dark`).
- O tema do sistema é detectado automaticamente; o usuário pode alternar manualmente pelo botão 🌞/🌙 no cabeçalho (preferência salva em `localStorage`).
- Breakpoints principais: `sm` (<640px), `md` (<768px) e `lg` (<1024px). Em telas estreitas a sidebar mostra apenas ícones.
- Para validar visualmente, rode `pnpm --filter @autoescola/web dev`, abra o app e no Chrome DevTools habilite o modo Device Toolbar (ex.: iPhone SE), conferindo também o comportamento do tema claro/escuro.
