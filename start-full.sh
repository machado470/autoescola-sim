#!/usr/bin/env bash
set -euo pipefail

SESSION="autoescola-sim"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

say(){ printf "\n\033[1;36m[%s]\033[0m %s\n" "$SESSION" "$*"; }
die(){ printf "\n\033[1;31m[ERRO]\033[0m %s\n" "$*"; exit 1; }
need(){ command -v "$1" >/dev/null 2>&1 || die "Dependência faltando: $1"; }

need tmux; need docker; need bash; need jq

[ -f package.json ] || die "package.json não encontrado"
jq . package.json >/dev/null || die "package.json inválido"

say "Subindo Postgres e PGAdmin (Docker)…"
docker compose up -d postgres pgadmin || docker-compose up -d postgres pgadmin

say "Aguardando Postgres ficar healthy…"
for i in {1..30}; do
  docker ps --format '{{.Names}} {{.Status}}' | grep -q 'autoescola_postgres.*(healthy)' && break
  sleep 2
done
docker ps --format '{{.Names}} {{.Status}}' | grep -q 'autoescola_postgres.*(healthy)' || die "Postgres não ficou healthy a tempo"

if [ -d prisma ] && [ -f prisma/schema.prisma ]; then
  say "Prisma generate…"
  npx prisma generate --schema=prisma/schema.prisma
  if [ -f .env ] && grep -q '^DATABASE_URL=' .env; then
    say "Prisma migrate deploy…"
    npx prisma migrate deploy --schema=prisma/schema.prisma || true
  else
    say "Sem DATABASE_URL no .env — pulando migrate (ok em dev)"
  fi
fi

if tmux has-session -t "$SESSION" 2>/dev/null; then
  say "tmux já existe — anexando"
  exec tmux attach -t "$SESSION"
fi

say "Criando sessão tmux…"
tmux new-session -d -s "$SESSION" -n "docker" "docker compose logs -f postgres || docker-compose logs -f postgres"

API_DIR="apps/api"
if [ -d "$API_DIR" ]; then
  tmux new-window -t "$SESSION:" -n "api" "cd '$API_DIR' && (command -v pnpm >/dev/null || npm i -g pnpm) && pnpm install && pnpm dev"
else
  tmux new-window -t "$SESSION:" -n "api" "echo 'apps/api não encontrado'; bash"
fi

if [ -f prisma/schema.prisma ]; then
  tmux new-window -t "$SESSION:" -n "studio" "npx prisma studio --schema=prisma/schema.prisma"
fi

UI_DIR="apps/ui"
[ -d "$UI_DIR" ] && tmux new-window -t "$SESSION:" -n "ui" "cd '$UI_DIR' && (command -v pnpm >/dev/null || npm i -g pnpm) && pnpm install && pnpm dev"

tmux new-window -t "$SESSION:" -n "shell" "bash"

say "Stack iniciada — anexando"
exec tmux attach -t "$SESSION"
