#!/usr/bin/env bash
set -euo pipefail

say(){ printf "\n\033[1;36m[prep-mv1]\033[0m %s\n" "$*"; }
die(){ printf "\n\033[1;31m[prep-mv1]\033[0m %s\n" "$*"; exit 1; }

command -v jq >/dev/null || die "jq não instalado (sudo apt-get install -y jq)"
command -v docker >/dev/null || die "docker não encontrado"
command -v git >/dev/null || die "git não encontrado"

say "📦 Validando package.json e prisma..."
[ -f package.json ] || die "package.json não encontrado"
jq . package.json >/dev/null || die "package.json inválido"
[ -f prisma/schema.prisma ] && npx prisma format >/dev/null

say "🧩 Coletando infos..."
BRANCH=$(git rev-parse --abbrev-ref HEAD)
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo none)
MODELS=$(grep -E "^model[[:space:]]+[A-Za-z0-9_]+" prisma/schema.prisma | sed "s/model /- /")

say "🧱 Atualizando README..."
cat <<TXT > README.md
# AutoEscola-Sim — MV1 Baseline 🚗

**Branch:** $BRANCH  
**Última tag:** $LATEST_TAG

## ✅ Modelos Prisma
$MODELS

## ▶️ Execução
\`\`\`bash
pnpm run start:full
pnpm run stop:full
\`\`\`

## 🗃️ Migrações
$(ls -1 prisma/migrations || echo "nenhuma migração encontrada")
TXT

say "🪄 Criando release/mv1 e tag..."
git checkout -B release/mv1
git add README.md scripts/prep-mv1.sh
git commit -m "mv1: baseline + resumo automático"
git tag -a mv1 -m "MV1 baseline pronta"
git push -u origin release/mv1
git push origin mv1 --force

say "✅ MV1 pronta e enviada!"
