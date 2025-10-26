#!/usr/bin/env bash
set -euo pipefail

SESSION="autoescola"
POSTGRES_CONTAINER="autoescola_postgres"

log() { printf "\n\033[1;36m[%s]\033[0m %s\n" "$(date +%H:%M:%S)" "$*"; }

# 0) docker ok?
if ! docker version >/dev/null 2>&1; then
  echo "🚫 Docker não acessível no WSL. Abra o Docker Desktop e habilite WSL integration."
  exit 1
fi

# 1) tmux (instala se faltar)
if ! command -v tmux >/dev/null 2>&1; then
  log "Instalando tmux..."
  sudo apt-get update -qq && sudo apt-get install -y -qq tmux
fi

# 2) cria sessão tmux
if tmux has-session -t "$SESSION" 2>/dev/null; then
  log "Sessão tmux '$SESSION' já existe. Anexando..."
  tmux attach -t "$SESSION"
  exit 0
fi

log "Criando sessão tmux '$SESSION'..."
tmux new-session -d -s "$SESSION" -n docker

# janela 1: docker compose up
tmux send-keys -t "$SESSION":docker 'echo "🚀 docker compose up -d --remove-orphans" && docker compose up -d --remove-orphans' C-m
tmux send-keys -t "$SESSION":docker 'echo "⏳ aguardando Postgres ficar healthy..."' C-m
tmux send-keys -t "$SESSION":docker '
for i in {1..60}; do
  STATUS=$(docker ps --filter name='"$POSTGRES_CONTAINER"' --format "{{.Status}}")
  echo "status: $STATUS"
  echo "$STATUS" | grep -qi healthy && break
  sleep 1
done
' C-m

# janela 2: prisma studio
tmux new-window -t "$SESSION" -n studio
tmux send-keys  -t "$SESSION":studio 'echo "📊 prisma studio (porta 5555)"' C-m
tmux send-keys  -t "$SESSION":studio 'pnpm -C apps/api prisma generate && pnpm -C apps/api prisma studio' C-m

# janela 3: api dev
tmux new-window -t "$SESSION" -n api
tmux send-keys  -t "$SESSION":api 'echo "�� iniciando API (Nest)..."' C-m
tmux send-keys  -t "$SESSION":api 'pnpm dev:api' C-m

log "Pronto! Janelas:
  - docker  → containers e health
  - studio  → Prisma Studio
  - api     → servidor Nest (http://localhost:3000)
"

tmux select-window -t "$SESSION":api
tmux attach -t "$SESSION"
