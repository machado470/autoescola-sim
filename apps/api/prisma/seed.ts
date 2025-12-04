import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed do banco...");

  const adminEmail = "admin@autoescola.com";

  // Verifica se já existe admin
  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    const hashed = await bcrypt.hash("123456", 10);

    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        passwordHash: hashed,
        role: "ADMIN",
      },
    });

    console.log("✔ Admin criado com sucesso!");
  } else {
    console.log("ℹ Admin já existe, pulando criação.");
  }

  console.log("🌱 Seed finalizado!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
