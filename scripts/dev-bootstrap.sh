#!/usr/bin/env bash
set -euo pipefail

echo "==> Verificando Docker..."
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker não está rodando. Abra o Docker Desktop e tente de novo."
  exit 1
fi

echo "==> Subindo Postgres/pgAdmin com docker compose..."
(docker compose up -d postgres pgadmin || docker-compose up -d postgres pgadmin)

echo -n "==> Aguardando Postgres ficar pronto (localhost:5432)"
for i in {1..60}; do
  if docker exec autoescola_postgres pg_isready -U postgres -d autoescola >/dev/null 2>&1; then
    echo " - pronto!"
    break
  fi
  echo -n "."
  sleep 1
  if [ "$i" -eq 60 ]; then
    echo -e "\n❌ Postgres não ficou pronto a tempo."; exit 1;
  fi
done

# Patch opcional do seed: troca "difficulty: Difficulty" por "Difficulty.EASY"
if [ -f prisma/seed.ts ] && grep -qE 'difficulty:\s*Difficulty([^.]|$)' prisma/seed.ts; then
  echo "==> Corrigindo enum de difficulty no prisma/seed.ts -> Difficulty.EASY"
  sed -i 's/difficulty:\s*Difficulty\b/difficulty: Difficulty.EASY/g' prisma/seed.ts
fi

echo "==> Prisma generate..."
pnpm prisma generate

echo "==> Prisma migrate deploy..."
pnpm prisma migrate deploy

echo "==> Rodando seed..."
if grep -q '"prisma"' package.json && grep -q '"seed"' package.json; then
  pnpm prisma db seed
else
  pnpm tsx prisma/seed.ts
fi

echo "✅ Finalizado com sucesso."
