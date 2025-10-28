#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "🐘 subindo Postgres/pgAdmin..."
docker compose up -d postgres pgadmin

echo "🔁 gerando cliente Prisma e aplicando migrations..."
cd apps/api
pnpm prisma generate
pnpm prisma migrate deploy

# garante seed configurado (idempotente)
if ! grep -q '"prisma"' package.json; then
  jq '. + {prisma: {seed: "ts-node prisma/seed.ts"}}' package.json > package.json.tmp && mv package.json.tmp package.json
fi
mkdir -p prisma
[ -f prisma/seed.ts ] || cat > prisma/seed.ts <<'TS'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: "admin@autoescola.local" },
    update: {},
    create: { email: "admin@autoescola.local", name: "Administrador" },
  });
  console.log("✅ seed ok");
}
main().finally(()=>prisma.$disconnect());
TS

echo "🌱 executando seed..."
pnpm prisma db seed || echo "ℹ️ seed não crítico"

echo "🚀 iniciando API (log em /tmp/api.log)..."
nohup pnpm dev > /tmp/api.log 2>&1 &

cd "$ROOT"
echo "🧼 ajustando front..."
./scripts/auto-fix-web.sh

echo "💻 iniciando Vite em apps/web..."
cd apps/web
pnpm install --silent
pnpm dev
