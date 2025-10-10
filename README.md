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

- O frontend utiliza Tailwind CSS com tokens de cor em `apps/web/src/index.css` e modo escuro ativado por classe (`dark`). As variáveis `--bg-base`, `--text-base`, `--card-bg` e `--accent` são alternadas conforme o tema ativo.
- O tema do sistema é detectado automaticamente já no carregamento inicial (ver `apps/web/index.html`). O usuário pode alternar manualmente pelo botão 🌞/🌙 no cabeçalho; a escolha é persistida em `localStorage` e respeita mudanças posteriores do sistema quando a preferência manual é removida.
- Breakpoints principais: `sm` (<640px), `md` (<768px) e `lg` (<1024px). Em telas estreitas a sidebar mostra apenas ícones e os cards do Dashboard reorganizam-se em colunas únicas.
- Para validar visualmente:
  1. Rode `pnpm --filter @autoescola/web dev`.
  2. Abra o app no navegador, habilite o Device Toolbar no Chrome DevTools (ex.: iPhone SE) e verifique navegação/ formulários.
  3. Altere o tema do sistema ou use o toggle para confirmar transições suaves entre claro/escuro.
