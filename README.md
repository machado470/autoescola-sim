# AutoEscola Sim — Monorepo

Guia rápido:
- Requisitos: Node 20+, pnpm, PostgreSQL 15+.
- Instalação: `pnpm i`
- Backend: copie `.env.example` para `.env`, ajuste `DATABASE_URL`, rode migrações/seed e `pnpm --filter @autoescola/api dev`.
  - Caso precise apenas validar rotas sem um Postgres disponível, defina `PRISMA_SKIP_CONNECT=true` para pular a conexão do Prisma.
- Frontend: `pnpm --filter @autoescola/web dev`
- Variáveis de ambiente: consulte `.env.sample`, `.env.example` e `.env.example.prod` para todas as chaves exigidas.

## Dev rápido

1. `docker compose up -d`
2. `pnpm install`
3. `pnpm -C apps/api prisma generate`
4. `pnpm -C apps/api prisma migrate dev --name init_v1`
5. `pnpm -C apps/api seed`
6. `pnpm -C apps/api dev`
7. `pnpm -C apps/web dev`

## Manutenção do ambiente local

- **Sincronize o repositório**: confirme que a branch atual está limpa (`git status`) e, quando um remoto estiver configurado, atualize com `git pull origin <branch>`.
- **WSL/Linux**: execute `wsl.exe --status` (no Windows) para garantir que a distribuição padrão esteja saudável e atualize os pacotes básicos (`sudo apt update && sudo apt upgrade`).
- **pnpm**: verifique a versão instalada com `pnpm -v` (a base atual usa `>=10.18`) e instale dependências com `pnpm install` para acionar o `postinstall` que gera o cliente Prisma.
- **Build do monorepo**: valide com `pnpm build`, que roda `pnpm -r build` nos workspaces `apps/api` e `apps/web`.

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

## Deploy

### Preparação

- Crie os arquivos de variáveis a partir dos exemplos:
  - API: copie `.env.example` ou `.env.example.prod` para `.env` dentro de `apps/api` e ajuste `DATABASE_URL`, `JWT_SECRET` e demais chaves.
  - Web: use `apps/web/.env.example.prod` como base para definir `VITE_API_URL` e `VITE_TOKEN_KEY`.
- Gere o cliente Prisma e construa tudo localmente para validar (o `postinstall` já chama `pnpm --filter @autoescola/api prisma:generate` automaticamente, mas o comando abaixo serve como fallback):
  ```bash
  pnpm install
  pnpm --filter @autoescola/api prisma:generate
  pnpm build
  ```

### Railway (API + Postgres)

1. Crie um novo projeto no [Railway](https://railway.app) e adicione um banco PostgreSQL.
2. Importe este repositório e selecione o serviço "API" definido em `railway.json` (build Docker multi-stage em `apps/api/Dockerfile`).
3. Configure as variáveis de ambiente do serviço API:
   - `DATABASE_URL` (use o connection string do Postgres provisionado).
   - `API_PORT=8080`.
   - `CORS_ORIGINS=https://autoescola-sim.vercel.app,http://localhost:5173` (ajuste conforme necessário).
   - `JWT_SECRET` e `JWT_EXPIRES_IN` (ex.: `1h`).
4. Ative a opção de deploy por Dockerfile e faça o primeiro deploy. As migrações Prisma (`prisma migrate deploy`) rodam automaticamente na inicialização do container.

### Vercel (Web)

1. Importe o repositório na Vercel selecionando a pasta `apps/web`.
2. Em "Build & Output Settings", mantenha o framework Vite e use o comando `pnpm --filter @autoescola/web build` (já definido em `vercel.json`).
3. Configure a variável `API_BASE_URL` com a URL pública da API no Railway (ex.: `https://autoescola-sim-production.up.railway.app`). A Vercel injetará o valor em `VITE_API_URL` durante o build.
4. Faça o deploy e valide com `pnpm --filter @autoescola/web preview` localmente quando necessário.

### Check-list pós-deploy

```bash
# API vivo
curl -s https://sua-api/health

# Autenticação
curl -s -X POST https://sua-api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@aes.com","senha":"123456"}'
```

Confirme também o carregamento do frontend e das telas protegidas utilizando o token retornado pela API.
