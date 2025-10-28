#!/usr/bin/env bash
set -e

# Uso: ./commit-push.sh "feat(web): ajusta layout e roteamento"
MSG="${1:-feat: atualizações menores}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo -e "${YELLOW}→ Branch atual:${NC} ${BRANCH}"
if git diff --quiet && git diff --cached --quiet; then
  echo -e "${RED}Nada para commitar (working tree clean).${NC}"
  exit 0
fi

echo -e "${YELLOW}→ Adicionando alterações...${NC}"
git add .

echo -e "${YELLOW}→ Criando commit...${NC}"
git commit -m "$MSG"

echo -e "${YELLOW}→ Enviando para origin/${BRANCH}...${NC}"
git push origin "$BRANCH"

echo -e "${GREEN}✓ Commit & push concluídos!${NC}"
git --no-pager log --oneline -n 1
