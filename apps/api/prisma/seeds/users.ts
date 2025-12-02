import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient) {
  console.log('👤 Seeding: Users');

  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@autoescola.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@autoescola.com',
      password,
      role: 'ADMIN',
    },
  });
}
