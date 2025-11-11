import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Exemplo: cria/garante admin (ajuste campos do seu modelo!)
  try {
    await prisma.user.upsert({
      where: { email: "admin@local" },
      update: {},
      create: { name: "Administrador", email: "admin@local", password: "admin", role: "ADMIN" }
    });
    console.log("✔ seed concluído");
  } finally {
    await prisma.$disconnect();
  }
}
main().catch(e => { console.error(e); process.exit(1); });
