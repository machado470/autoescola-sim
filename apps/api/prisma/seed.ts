import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@autoescola.local" },
    update: {},
    create: { email: "admin@autoescola.local", name: "Administrador" },
  });
  console.log("✅ Seed executado com sucesso!");
}

main().finally(async () => await prisma.$disconnect());
