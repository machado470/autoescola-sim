import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  console.log('🏷️ Seeding: Categories');

  const categories = ['Legislação', 'A', 'B', 'C', 'D', 'E'];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
