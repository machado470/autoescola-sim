#!/usr/bin/env bash
set -euo pipefail

say(){ printf "\n\033[1;36m[prep-mv1]\033[0m %s\n" "$*"; }
die(){ printf "\n\033[1;31m[prep-mv1]\033[0m %s\n" "$*"; exit 1; }

# 1) Validações rápidas
command -v jq >/dev/null || die "jq não instalado (sudo apt-get install -y jq)"
command -v docker >/dev/null || die "docker não encontrado"
command -v git >/dev/null || die "git não encontrado"

[ -f package.json ] || die "package.json não encontrado"
jq . package.json >/dev/null || die "package.json inválido"

if [ -f prisma/schema.prisma ]; then
  npx prisma format >/dev/null
fi

# 2) Coleta de infos
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
LATEST_TAG="$(git describe --tags --abbrev=0 2>/dev/null || echo none)"
GIT_SUMMARY="$(git log --pretty=format:"- %h %ad · %s" --date=short -n 30)"
if [ "$LATEST_TAG" != "none" ]; then
  GIT_SINCE_TAG="$(git log --pretty=format:"- %h %ad · %s" --date=short "${LATEST_TAG}..HEAD" || true)"
else
  GIT_SINCE_TAG="$GIT_SUMMARY"
fi

MODELS="$(grep -E "^model[[:space:]]+[A-Za-z0-9_]+" -n prisma/schema.prisma 2>/dev/null | sed "s/:.*model /- /")"
MIGRATIONS="$(ls -1 prisma/migrations 2>/dev/null || true)"

# Docker status
if docker compose version >/dev/null 2>&1; then
  DOCKER_TABLE="$(docker compose ps || true)"
else
  DOCKER_TABLE="$(docker ps || true)"
fi

# 3) Bloco README (entre marcadores)
readme_section() {
cat <<EOF
<!-- MV1:BEGIN -->
# MV1 — Baseline (auto)

**Branch:** \`$BRANCH\`${LATEST_TAG:+  · **Última tag:** \`$LATEST_TAG\`}

## ✅ O que já foi feito
${GIT_SINCE_TAG:-- (sem commits recentes)}

## 🧱 Modelos Prisma
${MODELS:-- (sem schema ou modelos não detectados)}

## 🗃️ Migrações
$(if [ -n "$MIGRATIONS" ]; then echo "$MIGRATIONS" | sed "s/^/- /"; else echo "- (nenhuma migração criada)"; fi)

## 🐳 Docker/Serviços
\`\`\`
$DOCKER_TABLE
\`\`\`

## ▶️ Como rodar
\`\`\`bash
pnpm run start:full
# para tudo:
pnpm run stop:full
\`\`\`

## 🌱 Seed (opcional)
\`\`\`bash
npx prisma db seed
\`\`\`

<!-- MV1:END -->
EOF
}

say "Atualizando README..."
if [ -f README.md ]; then
  # substitui bloco entre marcadores; cria se não existir
  if grep -q "<!-- MV1:BEGIN -->" README.md; then
    awk -v RS= -v ORS= 
