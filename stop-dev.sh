#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo ">> Matando processos Node/Vite"
pkill -f "ts-node-dev|vite|node" 2>/dev/null || true

echo ">> Docker down"
docker compose down || true

echo ">> Limpando caches"
rm -rf /tmp/ts-node-dev* apps/api/dist apps/web/dist

echo "✅ Ambiente parado e limpo."
