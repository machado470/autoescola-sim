#!/usr/bin/env bash
set -e

START_TIME=$(date +%s)

# cores e ícones
green="\033[1;32m"
yellow="\033[1;33m"
red="\033[1;31m"
blue="\033[1;34m"
reset="\033[0m"
check="${green}✔${reset}"
cross="${red}✖${reset}"
info="${blue}ℹ${reset}"

echo -e "${blue}🚗 AutoEscola-Sim • start-dev${reset}"
echo "----------------------------------------"

# 1) .env
if [ ! -f .env ]; then
  if [ -f .env.bak ]; then
    echo -e "${info} .env não encontrado, copiando de .env.bak..."
    cp .env.bak .env
  else
    echo -e "${cross} Nenhum .env nem .env.bak encontrado. Crie um .env primeiro."
    exit 1
  fi
fi

# 2) docker
echo -e "${info} Verificando Docker..."
docker ps >/dev/null 2>&1 || { echo -e "${cross} Docker não está rodando."; exit 1; }

echo -e "${info} Subindo docker-compose (se precisar)..."
docker compose up -d

# 3) host do banco
echo -e "${info} Detectando host do Postgres..."
if docker ps --format '{{.Names}}' | grep -q '^autoescola_postgres$'; then
  DB_HOST="autoescola_postgres"
else
  DB_HOST="localhost"
fi

# 4) ajustar DATABASE_URL
DB_URL="postgresql://postgres:postgres@${DB_HOST}:5432/autoescola?schema=public"
if grep -q '^DATABASE_URL=' .env; then
  sed -i "s|^DATABASE_URL=.*|DATABASE_URL=\"${DB_URL}\"|g" .env
else
  echo "DATABASE_URL=\"${DB_URL}\"" >> .env
fi
echo -e "${check} DATABASE_URL ajustada → ${DB_HOST}"

# 5) esperar banco
echo -e "${info} Esperando Postgres responder..."
for i in {1..15}; do
  if docker exec autoescola_postgres pg_isready -U postgres -d autoescola >/dev/null 2>&1; then
    echo -e "${check} Postgres disponível."
    break
  fi
  sleep 1
done

# 6) Prisma
echo -e "${info} Executando Prisma generate..."
pnpm prisma generate

echo -e "${info} Executando Prisma migrate dev..."
pnpm prisma migrate dev

echo -e "${info} Executando Prisma db seed..."
pnpm prisma db seed

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "----------------------------------------"
echo -e "${green}🎉 Ambiente pronto em ${ELAPSED}s!${reset}"
