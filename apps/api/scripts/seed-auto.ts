import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "admin@local";
  const password = "admin";

  console.log(">> Criando usuário admin (se não existir)...");

  const exists = await prisma.user.findUnique({
    where: { email }
  });

  if (exists) {
    console.log("✔ Admin já existe, nada a fazer.");
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      nome: "Administrador",
      email,
      password: hash,
      role: "ADMIN"
    }
  });

  console.log("✔ Admin criado: email=admin@local | senha=admin");
}

main()
  .catch((err) => {
    console.error("Erro no seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
