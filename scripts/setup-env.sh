#!/usr/bin/env bash
# ============================================
# AutoEscola-Sim :: Setup de ambiente resiliente
# ============================================

RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
NC="\e[0m"

echo -e "${BLUE}🚀 Iniciando preparação do ambiente (autoescola-sim)...${NC}"

# 1. garantir que está na raiz do projeto
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Você não está na raiz do projeto.${NC}"
  exit 1
fi

# 2. verificar Docker
echo -e "${BLUE}🐋 Verificando Docker...${NC}"
if ! docker info >/dev/null 2>&1; then
  echo -e "${RED}❌ Docker não acessível.${NC}"
  echo -e "${YELLOW}Abra o Docker Desktop e rode novamente.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Docker OK${NC}"

# 3. subir containers
if [ -f "docker-compose.yml" ]; then
  echo -e "${BLUE}▶ Subindo containers...${NC}"
  docker compose up -d
else
  echo -e "${YELLOW}⚠ Nenhum docker-compose.yml encontrado, pulando etapa.${NC}"
fi

# 4. localizar e esperar Postgres
PG_CONTAINER=$(docker ps --filter "name=postgres" --format '{{.Names}}' | head -n1)
if [ -z "$PG_CONTAINER" ]; then
  echo -e "${RED}❌ Nenhum container Postgres detectado.${NC}"
  exit 1
fi

echo -e "${BLUE}🔍 Aguardando Postgres iniciar...${NC}"
for i in {1..20}; do
  if docker exec "$PG_CONTAINER" pg_isready -U postgres >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Postgres pronto${NC}"
    break
  else
    echo -e "${YELLOW}⏳ Esperando... ($i/20)${NC}"
    sleep 2
  fi
done

PG_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$PG_CONTAINER")
echo -e "${BLUE}📡 Postgres ativo em: ${PG_IP}${NC}"

# 5. preparar Prisma Client e migrations
echo -e "${BLUE}🧩 Gerando Prisma Client...${NC}"
pnpm prisma generate
echo -e "${GREEN}✅ Prisma Client OK${NC}"

echo -e "${BLUE}📚 Aplicando migrations...${NC}"
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/autoescola?schema=public" pnpm prisma migrate deploy
echo -e "${GREEN}✅ Migrations aplicadas${NC}"

# 6. aplicar seed com retry
echo -e "${BLUE}🌱 Aplicando seed (com retry)...${NC}"
MAX_RETRIES=5
SLEEP_SECONDS=3
for i in $(seq 1 $MAX_RETRIES); do
  DATABASE_URL="postgresql://postgres:postgres@localhost:5433/autoescola?schema=public" pnpm prisma db seed && {
    echo -e "${GREEN}✅ Seed executado com sucesso${NC}"
    break
  }
  echo -e "${YELLOW}⚠ Seed falhou (tentativa $i/${MAX_RETRIES}). Tentando novamente...${NC}"
  sleep $SLEEP_SECONDS
done

echo -e "${GREEN}✨ Ambiente preparado com sucesso!${NC}"
