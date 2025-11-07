#!/usr/bin/env bash
set -euo pipefail

echo "➡️  MV2 bootstrap — $(date)"

git fetch --all --prune
current_branch=$(git rev-parse --abbrev-ref HEAD)
target_branch="feat/mv2-upgrade"
if [ "$current_branch" != "$target_branch" ]; then
  echo "🔀 Mudando para $target_branch"
  git checkout -B "$target_branch" "origin/$target_branch" || git checkout "$target_branch"
fi
git pull --rebase --autostash || true

if [ ! -f ".env" ] && [ -f ".env.bak" ]; then
  echo "📄 Criando .env a partir de .env.bak"
  cp .env.bak .env
fi

if command -v docker >/dev/null 2>&1; then
  echo "🐳 Subindo docker-compose em background"
  docker compose up -d || docker-compose up -d
else
  echo "⚠️  Docker não encontrado no PATH — pulando infra"
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "🚧 pnpm não encontrado. Instalando..."
  corepack enable || true
  npm i -g pnpm
fi

echo "📦 Instalando dependências"
pnpm install --frozen-lockfile=false

PRISMA_DIR="."
if [ -d "prisma" ]; then PRISMA_DIR=".";
elif [ -d "apps/api/prisma" ]; then PRISMA_DIR="apps/api";
elif [ -d "packages/api/prisma" ]; then PRISMA_DIR="packages/api";
fi
echo "🗃  Prisma dir: $PRISMA_DIR"

pushd "$PRISMA_DIR" >/dev/null
npx prisma generate || true
npx prisma migrate dev --name mv2_base || true
npx prisma db seed || true
popd >/dev/null

start_proc () {
  local path="$1"; local script="$2"; local name="$3"
  if [ -d "$path" ]; then
    ( cd "$path" && echo "▶️  Iniciando $name em $path" && pnpm "$script" ) &
  fi
}
if pnpm -s -w run | grep -q "^dev"; then
  echo "▶️  Iniciando monorepo com pnpm dev (raiz)"
  pnpm dev &
else
  start_proc "apps/api" "dev" "API"
  start_proc "apps/web" "dev" "Web"
  start_proc "packages/api" "dev" "API(pckg)"
  start_proc "packages/web" "dev" "Web(pckg)"
fi

echo "✅ MV2 on — logs a seguir. Para encerrar: Ctrl+C"
wait
