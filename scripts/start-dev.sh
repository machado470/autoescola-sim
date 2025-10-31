#!/usr/bin/env bash
set -e

echo "🚗 AutoEscola-Sim • start-dev"
echo "----------------------------------------"

# 1) garantir .env
if [ ! -f .env ]; then
  if [ -f .env.bak ]; then
    echo "📄 .env não existe, criando a partir de .env.bak..."
    cp .env.bak .env
  else
    echo "❌ Nenhum .env nem .env.bak encontrado. Crie um .env primeiro."
    exit 1
  fi
fi

# 2) subir docker se não estiver
echo "🐳 Verificando Docker..."
docker ps >/dev/null 2>&1 || { echo "❌ Docker não está rodando."; exit 1; }

echo "🐳 Subindo docker-compose (se precisar)..."
docker compose up -d

# 3) descobrir se o container existe
echo "🔎 Detectando host do Postgres..."
if docker ps --format '{{.Names}}' | grep -q '^autoescola_postgres$'; then
  DB_HOST="autoescola_postgres"
else
  DB_HOST="localhost"
fi

# 4) ajustar DATABASE_URL no .env
DB_URL="postgresql://postgres:postgres@${DB_HOST}:5432/autoescola?schema=public"
if grep -q '^DATABASE_URL=' .env; then
  # substitui linha
  sed -i "s|^DATABASE_URL=.*|DATABASE_URL=\"${DB_URL}\"|g" .env
else
  echo "DATABASE_URL=\"${DB_URL}\"" >> .env
fi
echo "✅ DATABASE_URL ajustada para: ${DB_URL}"

# 5) esperar postgres ficar pronto
echo "⏳ Esperando Postgres responder..."
for i in {1..15}; do
  if docker exec autoescola_postgres pg_isready -U postgres -d autoescola >/dev/null 2>&1; then
    echo "✅ Postgres disponível."
    break
  fi
  sleep 1
done

# 6) prisma
echo "🧠 Prisma generate..."
pnpm prisma generate

echo "🧱 Prisma migrate dev..."
pnpm prisma migrate dev

echo "🌱 Prisma db seed..."
pnpm prisma db seed

echo "🎉 Ambiente dev pronto."
