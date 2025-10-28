#!/usr/bin/env bash
set -euo pipefail

# Se nada staged, stage tudo
if [ -z "$(git diff --cached --name-only)" ]; then
  git add .
fi

CHANGED=$(git diff --cached --name-only || true)

if [ -z "$CHANGED" ]; then
  echo "Nada para commitar."
  exit 0
fi

# Detecta scope
SCOPE="repo"
echo "$CHANGED" | grep -q '^apps/web/' && SCOPE="front"
echo "$CHANGED" | grep -q '^apps/api/' && SCOPE="api"
echo "$CHANGED" | grep -q '^prisma/' && SCOPE="db"

# Detecta tipo básico
TYPE="chore"
echo "$CHANGED" | grep -E '\.(ts|tsx|js|jsx|css|json|yml|yaml)$' >/dev/null && TYPE="fix"
git diff --cached --name-status | grep -q '^A\s' && TYPE="feat"

# Resumo de dif (linhas + / -)
DIFFSUM=$(git diff --cached --numstat | awk '{a+=$1;b+=$2} END{printf("+%s/-%s", a? a:0, b? b:0)}')

# Primeira alteração como titulo
TITLE=$(echo "$CHANGED" | head -n1 | sed 's|^apps/||; s|^prisma/||')

MSG="$TYPE($SCOPE): update $TITLE $DIFFSUM"

BR=$(git rev-parse --abbrev-ref HEAD)
echo "Commit: $MSG"
git commit -m "$MSG" || { echo "Nada novo para commitar."; exit 0; }
git push -u origin "$BR"
echo "✔ Enviado para $BR"
