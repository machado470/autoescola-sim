#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo ">> Instalando deps (pnpm)"
pnpm install

echo ">> Subindo Postgres (docker compose)"
docker compose up -d

echo ">> Gerando Prisma Client da API"
pnpm --filter @autoescola/api exec prisma generate

echo
echo "✅ Ambiente base pronto."
echo "Abra dois terminais separados e rode:"
echo "  [api] pnpm --filter @autoescola/api dev"
echo "  [web] pnpm --filter @autoescola/web dev"
echo
echo "Dica: teste a API com:  curl -sS http://localhost:3000/health"
