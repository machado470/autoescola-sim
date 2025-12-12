import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Criar ALUNO
  await prisma.user.create({
    data: {
      name: "Aluno Teste",
      email: "aluno@autoescola.com",
      passwordHash: await bcrypt.hash("123456", 10),
      role: "STUDENT",
    },
  });

  // Criar ADMIN
  await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@autoescola.com",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  console.log("🌱 Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
