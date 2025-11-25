#!/usr/bin/env bash
set -euo pipefail
SESSION="autoescola-sim"
echo -e "\n[${SESSION}] Encerrando tmux…"
tmux has-session -t "$SESSION" 2>/dev/null && tmux kill-session -t "$SESSION" || true
echo -e "\n[${SESSION}] Parando containers…"
docker compose down || docker-compose down
echo -e "\n[${SESSION}] OK."
