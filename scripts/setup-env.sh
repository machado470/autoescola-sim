#!/usr/bin/env bash

# =======================
# setup-env.sh
# Script de preparação do ambiente do autoescola-sim
# =======================

set -e

GREEN="\e[32m"
YELLOW="\e[33m"
RED="\e[31m"
BLUE="\e[34m"
NC="\e[0m"

echo -e "${BLUE}▶ Iniciando preparação do ambiente (autoescola-sim)...${NC}"

# 1. conferir se estamos na raiz do projeto
if [ ! -f "package.json" ] || [ ! -d "prisma" ]; then
  echo -e "${RED}❌ Parece que você não está na raiz do projeto (autoescola-sim).${NC}"
  echo -e "${YELLOW}➡ Entre na pasta do projeto e rode de novo:${NC} cd ~/projects/autoescola-sim"
  exit 1
fi

# 2. verificar se docker está rodando
echo -e "${BLUE}▶ Verificando Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker não está acessível dentro do WSL.${NC}"
  echo -e "${YELLOW}➡ Abra o Docker Desktop no Windows e rode de novo.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Docker OK${NC}"

# 3. subir containers (se existir docker-compose.yml)
if [ -f "docker-compose.yml" ]; then
  echo -e "${BLUE}▶ Subindo containers do projeto...${NC}"
  docker compose up -d
  echo -e "${GREEN}✅ Containers ativos${NC}"
else
  echo -e "${YELLOW}⚠ Nenhum docker-compose.yml encontrado. Pulando esta etapa.${NC}"
fi

# 4. instalar deps se faltar node_modules
if [ ! -d "node_modules" ]; then
  echo -e "${BLUE}▶ Instalando dependências (pnpm)...${NC}"
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install
  else
    echo -e "${RED}❌ pnpm não encontrado.${NC}"
    echo -e "${YELLOW}➡ Instale com:${NC} npm install -g pnpm"
    exit 1
  fi
  echo -e "${GREEN}✅ Dependências instaladas${NC}"
fi

# 5. prisma generate
echo -e "${BLUE}▶ Gerando cliente Prisma...${NC}"
pnpm prisma generate
echo -e "${GREEN}✅ Prisma generate OK${NC}"

# 6. prisma migrate
echo -e "${BLUE}▶ Aplicando migrations...${NC}"
pnpm prisma migrate deploy || pnpm prisma migrate dev --name init
echo -e "${GREEN}✅ Migrations aplicadas${NC}"

# 7. prisma seed (se existir)
if grep -q "prisma db seed" package.json; then
  echo -e "${BLUE}▶ Executando seed do banco...${NC}"
  pnpm prisma db seed
  echo -e "${GREEN}✅ Seed executado${NC}"
else
  echo -e "${YELLOW}⚠ Nenhum seed configurado no package.json. Pulando.${NC}"
fi

echo -e "${GREEN}✅ Ambiente preparado com sucesso!${NC}"
echo -e "${BLUE}▶ Agora você pode rodar o app normalmente.${NC}"
echo -e "${BLUE}▶ Exemplo:${NC} pnpm run dev   (no front) / pnpm run start:dev   (no back)"
