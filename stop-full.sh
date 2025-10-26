#!/usr/bin/env bash
set -euo pipefail
SESSION="autoescola"

echo "🧹 encerrando sessão tmux (se existir)..."
tmux has-session -t "$SESSION" 2>/dev/null && tmux kill-session -t "$SESSION" || echo "nenhuma sessão tmux '$SESSION' ativa."

if [[ "${1-}" == "--down" ]]; then
  echo "🛑 docker compose down"
  docker compose down
else
  echo "ℹ️  containers continuam rodando (use '--down' para derrubar)."
fi
