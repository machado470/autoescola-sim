#!/usr/bin/env bash
set -e
REQ_DIRS=(
  "apps" "apps/api" "apps/api/prisma" "apps/web"
  "packages" "packages/ui" "packages/config"
  "infra" "infra/docker"
  ".github" ".github/workflows"
)
REQ_FILES=(
  "pnpm-workspace.yaml"
  "docker-compose.yml"
  "apps/api/.env"
  "apps/api/prisma/schema.prisma"
)

echo "== Pastas requeridas =="
for d in "${REQ_DIRS[@]}"; do
  [[ -d "$d" ]] && echo "🟢 $d" || echo "🔴 $d (faltando)"
done

echo -e "\n== Arquivos requeridos =="
for f in "${REQ_FILES[@]}"; do
  [[ -f "$f" ]] && echo "🟢 $f" || echo "🔴 $f (faltando)"
done

echo -e "\nDica: rode ./create-missing.sh para criar o que faltar (não sobrescreve o que já existe)."
