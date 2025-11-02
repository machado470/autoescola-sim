#!/usr/bin/env bash
# Script: auto-commit.sh
# Executa setup, commit e push automático

set -e
GREEN="\e[32m"; RED="\e[31m"; BLUE="\e[34m"; NC="\e[0m"

echo -e "${BLUE}▶ Iniciando commit automatizado do projeto autoescola-sim...${NC}"

# 1. preparar ambiente
if [ -f "scripts/setup-env.sh" ]; then
  echo -e "${BLUE}▶ Rodando setup-env.sh...${NC}"
  ./scripts/setup-env.sh
else
  echo -e "${RED}❌ setup-env.sh não encontrado.${NC}"
  exit 1
fi

# 2. adicionar mudanças
echo -e "${BLUE}▶ Adicionando mudanças...${NC}"
git add .

# 3. mensagem de commit
MSG="$1"
if [ -z "$MSG" ]; then
  MSG="chore: atualização automática do ambiente e código"
fi

echo -e "${BLUE}▶ Commitando com mensagem:${NC} '$MSG'"
git commit -m "$MSG" || echo -e "${YELLOW}⚠ Nada novo para commitar.${NC}"

# 4. push
echo -e "${BLUE}▶ Enviando para o repositório remoto...${NC}"
git push origin main

echo -e "${GREEN}✅ Commit e push finalizados com sucesso.${NC}"
