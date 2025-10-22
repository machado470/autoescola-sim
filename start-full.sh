#!/usr/bin/env bash
set -e

# 1) Checa Docker
bash ./check-docker.sh

# 2) Sobe banco (Postgres + pgAdmin)
echo "▶ docker compose up -d"
docker compose up -d

# 3) Prisma (gera + migra)
echo "▶ pnpm prisma generate"
pnpm prisma generate

echo "▶ pnpm prisma migrate dev --name init (idempotente)"
pnpm prisma migrate dev --name init

# 4) Inicia API
echo "▶ pnpm run dev"
pnpm run dev
