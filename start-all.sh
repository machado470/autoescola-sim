#!/usr/bin/env bash
set -euo pipefail

API_URL="http://localhost:3000"
UI_DIR="./apps/ui"

echo "🧹 Matando Vite antigo (5173), se houver..."
pkill -f "vite.*5173" >/dev/null 2>&1 || true

echo "🐘 Subindo Postgres + API..."
docker compose up -d autoescola_postgres api

echo "⏳ Esperando API responder em ${API_URL}/health (timeout 120s)..."
ok=0
for i in $(seq 1 60); do
  code=$(curl -sS -o /dev/null -w '%{http_code}' "${API_URL}/health" || true)
  if [ "$code" = "200" ]; then ok=1; break; fi
  sleep 2
done

if [ "$ok" -ne 1 ]; then
  echo "❌ API não ficou pronta a tempo. Últimos logs da API:"
  docker compose logs --no-color --tail=200 api || true
  exit 1
fi

echo "✅ API OK em ${API_URL}"

echo "🔑 Garantindo usuário admin@local (senha: admin)..."
docker exec -i autoescola_api node -e "
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  const password = await bcrypt.hash('admin', 10);
  await prisma.user.upsert({
    where: { email: 'admin@local' },
    update: { name: 'Administrador', role: 'ADMIN', password },
    create: { email: 'admin@local', name: 'Administrador', role: 'ADMIN', password },
  });
  console.log('✔ admin@local criado/atualizado');
})();"

echo "⚙️ Configurando UI (Vite)..."
mkdir -p "$UI_DIR"
printf "VITE_API_URL=${API_URL}\n" > "${UI_DIR}/.env.local"

echo "📦 Instalando deps da UI (idempotente)..."
pnpm --filter "$UI_DIR" install --silent

echo "🚀 Subindo UI (5173)… (acesse http://localhost:5173/)"
exec pnpm --filter "$UI_DIR" dev -- --host
