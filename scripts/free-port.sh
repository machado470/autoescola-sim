#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-3000}"
LOCK="/tmp/port-$PORT.lock"

if [ -f "$LOCK" ]; then
  echo "⚠️  Já existe um processo registrado na porta $PORT. Finalizando..."
  PID=$(cat "$LOCK" || true)
  if [ -n "$PID" ] && ps -p "$PID" > /dev/null 2>&1; then
    echo "🛑 Matando processo antigo $PID..."
    kill -9 "$PID" || true
  fi
  rm -f "$LOCK"
fi

echo "🔧 Limpando porta ${PORT}..."
sudo fuser -k "${PORT}/tcp" 2>/dev/null || true
sleep 1

if ss -ltn | grep -q ":${PORT}"; then
  echo "❌ Erro: porta ${PORT} ainda ocupada."
  exit 1
fi

echo "✅ Porta ${PORT} liberada"
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

echo "🚀 Iniciando API..."
pnpm run dev:api
