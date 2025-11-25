import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@autoescola.com' },
    update: {},
    create: {
      email: 'admin@autoescola.com',
      password: hash,
      name: 'Administrador'
    }
  });
}

main()
  .then(() => console.log('Seed executado com sucesso!'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
