import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.user.upsert({
      where:  { email: 'admin@local' },
      update: {},
      create: { name: 'Administrador', email: 'admin@local', password: 'admin', role: 'ADMIN' }
    });
    console.log('✔ seed concluído (admin@local)');
  } catch (e) {
    console.error('Seed falhou:', e);
    process.exitCode = 1;
  } finally {
    await prisma.();
  }
})();
