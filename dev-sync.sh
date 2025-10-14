#!/usr/bin/env bash
set -euo pipefail

MSG="${1:-}"
PREFIX="${2:-chore}"

if [ -z "${MSG}" ]; then
  echo "Uso: $0 \"mensagem do commit\" [prefixo-da-branch]"
  echo "Ex.: $0 \"feat: agenda CRUD funcionando\" feat"
  exit 1
fi

# Verificacoes basicas
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Nao é um repositorio Git."; exit 1; }
git fetch --all --quiet || true

# Garantir main atualizada
git checkout main
git pull origin main --rebase

# Nome de branch previsivel
ts="$(date +%Y%m%d-%H%M)"
slug="$(echo "${MSG}" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-+|-+$//g' | cut -c1-40)"
branch="${PREFIX}/${slug}-${ts}"

git switch -c "${branch}"

# Adiciona tudo (ajuste se quiser mais fino)
git add -A

# Se nada pra commitar, encerra educadamente
if git diff --cached --quiet; then
  echo "Nada para commitar. Finalizando."
  exit 0
fi

# Commit assinado (regras do repo exigem assinatura)
set +e
git commit -S -m "${MSG}"
ec=$?
set -e
if [ $ec -ne 0 ]; then
  echo "Falha ao assinar commit. Verifique 'git config --global gpg.format ssh' e sua Signing key no GitHub."
  exit $ec
fi

git push -u origin "${branch}"

# Abre PR automaticamente se 'gh' existir; senao, mostra URL
if command -v gh >/dev/null 2>&1; then
  gh pr create --fill --base main --head "${branch}" || true
else
  remote_url="$(git remote get-url origin | sed 's/\.git$//')"
  echo "Abra seu PR em:"
  echo "${remote_url}/compare/main...${branch}?expand=1"
fi
