#!/usr/bin/env bash
set -e

SCHEMA="prisma/schema.prisma"
SEED="prisma/seed.ts"

echo "🔎 procurando model de alternativa no schema..."

# pega o primeiro model que termine com 'Choice'
MODEL=$(grep -E '^model .*Choice' "$SCHEMA" | awk '{print $2}' | head -n1)

if [ -z "$MODEL" ]; then
  echo "❌ não achei nenhum model que termine com 'Choice' em $SCHEMA"
  echo "   abre o prisma/seed.ts e troca 'prisma.choice' pro nome certo na mão."
  exit 1
fi

echo "✅ modelo encontrado no schema: $MODEL"
echo "🛠  ajustando prisma/seed.ts..."

# troca as chamadas erradas
sed -i "s/prisma\.choice\.deleteMany()/prisma.$MODEL.deleteMany()/g" "$SEED"
sed -i "s/prisma\.choice\.create/prisma.$MODEL.create/g" "$SEED"

echo "✅ prisma/seed.ts atualizado pra usar prisma.$MODEL"
echo "🚀 rodando seed pra testar..."
pnpm prisma db seed
