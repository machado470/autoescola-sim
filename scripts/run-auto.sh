#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Iniciando AutoEscola-Sim full-stack..."

cd /mnt/c/Projetos/autoescola-sim

# 1. Verifica Docker
if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker não está em execução. Inicie o Docker Desktop e tente novamente."
  exit 1
fi

# 2. Sobe containers Postgres + pgAdmin
echo "🐘 Subindo containers Postgres/pgAdmin..."
docker compose up -d
sleep 5

# 3. Gera Prisma Client e aplica migrations
echo "🧩 Gerando Prisma Client e aplicando migrations..."
pnpm -C apps/api prisma generate
pnpm -C apps/api prisma migrate deploy || true

# 4. Executa seed se existir
if [ -f apps/api/prisma/seed.ts ]; then
  echo "🌱 Executando seed..."
  pnpm -C apps/api prisma db seed || echo "⚠️ Seed ignorado (não crítico)"
else
  echo "⚠️ Nenhum seed.ts encontrado, pulando etapa de seed."
fi

# 5. Inicia API e Web (ambas em background)
echo "🔧 Iniciando API e Web..."
(cd apps/api && pnpm dev > ../../logs/api.log 2>&1 &) 
(cd apps/web && pnpm dev > ../../logs/web.log 2>&1 &) 

# 6. Aguarda inicialização e abre no navegador
sleep 4
echo "🌐 Abrindo http://localhost:5173 ..."
if command -v xdg-open >/dev/null; then
  xdg-open http://localhost:5173 >/dev/null 2>&1 &
elif command -v explorer.exe >/dev/null; then
  explorer.exe "http://localhost:5173"
fi

echo "✅ AutoEscola-Sim iniciado com sucesso!"
echo "🧠 API: http://localhost:3000"
echo "💻 Web: http://localhost:5173"
echo "🐘 pgAdmin: http://localhost:5050"
