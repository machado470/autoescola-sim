import { PrismaClient } from '@prisma/client';

import * as usersSeed from './seeds/users';
import * as categoriesSeed from './seeds/categories';
import * as phasesSeed from './seeds/phases';
import * as lessonsSeed from './seeds/lessons';
import * as questionsSeed from './seeds/questions';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Iniciando seed do banco...');

  await usersSeed.seedUsers(prisma);
  await categoriesSeed.seedCategories(prisma);
  await phasesSeed.seedPhases(prisma);
  await lessonsSeed.seedLessons(prisma);
  await questionsSeed.seedQuestions(prisma);

  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
