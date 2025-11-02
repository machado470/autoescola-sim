#!/usr/bin/env bash
set -e

START_TIME=$(date +%s)

green="\033[1;32m"
yellow="\033[1;33m"
red="\033[1;31m"
blue="\033[1;34m"
reset="\033[0m"
check="${green}✔${reset}"
info="${blue}ℹ${reset}"
cross="${red}✖${reset}"

echo -e "${blue}🧹 AutoEscola-Sim • clean-env${reset}"
echo "----------------------------------------"

# 1) parar e remover docker
if [ -f docker-compose.yml ] || [ -f docker-compose.yaml ]; then
  echo -e "${info} Derrubando containers do projeto (docker compose down -v --remove-orphans)..."
  docker compose down -v --remove-orphans || true
else
  echo -e "${yellow}⚠ docker-compose.yml não encontrado, pulando down...${reset}"
fi

# 2) limpar docker total
echo -e "${info} Limpando recursos do Docker (images, volumes, networks não usados)..."
docker system prune -a --volumes -f || true
echo -e "${check} Docker limpo."

# 3) limpar artefatos locais
echo -e "${info} Limpando artefatos locais (logs, dist, .turbo, .next)..."
rm -rf logs dist .turbo .next .parcel-cache 2>/dev/null || true
echo -e "${check} Artefatos locais removidos."

# 4) limpar node_modules se existir
if [ -d node_modules ]; then
  echo -e "${info} Removendo node_modules..."
  rm -rf node_modules
  echo -e "${check} node_modules removido."
fi

# 5) pnpm
if command -v pnpm >/dev/null 2>&1; then
  echo -e "${info} Limpando cache do pnpm..."
  pnpm store prune || true
  echo -e "${info} Reinstalando dependências..."
  pnpm install
  echo -e "${check} Dependências reinstaladas."
else
  echo -e "${yellow}⚠ pnpm não encontrado, pulei essa parte.${reset}"
fi

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo "----------------------------------------"
echo -e "${green}🎉 Limpeza concluída em ${ELAPSED}s.${reset}"
echo -e "${info} Para subir de novo: bash scripts/start-dev.sh"
