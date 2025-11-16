#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "==> Subindo containers (API + Postgres)..."
docker compose up -d --build

echo
echo "==> Aplicando migrações Prisma..."
docker compose exec -T api npx prisma migrate deploy --schema apps/api/prisma/schema.prisma

echo
echo "==> Garantindo admin@autoescola.com / 123456..."
docker compose exec -T api node - <<'NODE'
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

(async () => {
  const prisma = new PrismaClient();
  const hash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@autoescola.com" },
    update: { password: hash, name: "Admin AutoEscola" },
    create: {
      email: "admin@autoescola.com",
      name: "Admin AutoEscola",
      password: hash,
    },
  });

  console.log("Admin criado/atualizado:", { id: user.id, email: user.email });
  await prisma.$disconnect();
})();
NODE

echo
echo "==> Subindo front (Vite em apps/web)..."
cd apps/web

if [ ! -d node_modules ]; then
  echo "   node_modules não encontrado, rodando pnpm install..."
  pnpm install
fi

pnpm dev
