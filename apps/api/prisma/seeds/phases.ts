import { PrismaClient } from '@prisma/client';

export async function seedPhases(prisma: PrismaClient) {
  console.log('📚 Seeding: Phases');

  const category = await prisma.category.findFirst({
    where: { name: 'Legislação' },
  });

  if (!category) {
    console.error('❌ Categoria Legislação não encontrada.');
    return;
  }

  const phases = [
    'Legislação de Trânsito',
    'Direção Defensiva',
    'Primeiros Socorros',
    'Meio Ambiente',
    'Mecânica Básica',
  ];

  let order = 1;

  for (const name of phases) {
    await prisma.phase.upsert({
      where: {
        categoryId_name: {
          categoryId: category.id,
          name,
        },
      },
      update: {},
      create: {
        name,
        order,
        categoryId: category.id,
      },
    });

    order++;
  }
}
