#!/usr/bin/env bash
set -e

Y='\033[1;33m'; G='\033[0;32m'; R='\033[0;31m'; N='\033[0m'

echo -e "${Y}▶ Verificando Docker/Compose...${N}"
if ! docker version >/dev/null 2>&1; then
  echo -e "${R}✗ Docker daemon indisponível. Rode ./check-docker.sh${N}"; exit 1
fi
if ! docker compose version >/dev/null 2>&1; then
  echo -e "${R}✗ docker compose não encontrado. sudo apt install -y docker-compose-plugin${N}"; exit 1
fi

echo -e "${Y}▶ Subindo containers (Postgres/pgAdmin)...${N}"
docker compose up -d

# === Ajuste de DATABASE_URL para WSL (host: localhost) ===
if [[ -f .env ]]; then
  DBURL="$(grep -E '^DATABASE_URL=' .env | sed 's/^DATABASE_URL="//; s/"$//')"
  if grep -qi 'microsoft' /proc/version 2>/dev/null; then
    # WSL detectado
    if echo "$DBURL" | grep -q '@postgres:5432'; then
      echo -e "${Y}▶ Ajustando .env para WSL (postgres -> localhost)...${N}"
      sed -i 's/@postgres:5432/@localhost:5432/g' .env
      DBURL="$(grep -E '^DATABASE_URL=' .env | sed 's/^DATABASE_URL="//; s/"$//')"
    fi
  fi
else
  echo -e "${R}✗ .env não encontrado na raiz do projeto.${N}"; exit 1
fi

# Descobre host/porta atuais só para esperar corretamente
DB_HOST="$(echo "$DBURL" | sed -E 's#.*@([^:/?]+):([0-9]+).*#\1#')"
DB_PORT="$(echo "$DBURL" | sed -E 's#.*@([^:/?]+):([0-9]+).*#\2#')"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

echo -e "${Y}▶ Aguardando Postgres em ${DB_HOST}:${DB_PORT}...${N}"
WAIT_OK=0
for i in {1..60}; do
  if command -v nc >/dev/null 2>&1; then
    nc -z "${DB_HOST}" "${DB_PORT}" && WAIT_OK=1 && break
  else
    (echo >"/dev/tcp/${DB_HOST}/${DB_PORT}") >/dev/null 2>&1 && WAIT_OK=1 && break || true
  fi
  sleep 1
done
if [[ $WAIT_OK -ne 1 ]]; then
  echo -e "${R}✗ Timeout esperando Postgres em ${DB_HOST}:${DB_PORT}.${N}"; exit 1
fi
echo -e "${G}✓ Postgres disponível.${N}"

echo -e "${Y}▶ Prisma generate...${N}"
pnpm prisma generate

echo -e "${Y}▶ Prisma migrate (idempotente)...${N}"
pnpm prisma migrate dev --name init

echo -e "${Y}▶ Iniciando API (dev)...${N}"
pnpm run dev
