import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed do banco...');

  //
  // ADMIN USER
  //
  const adminEmail = 'admin@autoescola.com';

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    const hashed = await bcrypt.hash('123456', 10);

    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashed,
        role: 'ADMIN',
      },
    });

    console.log('👑 Admin criado:', adminEmail);
  } else {
    console.log('👑 Admin já existe, pulando...');
  }

  //
  // CATEGORIES
  //
  const categories = [
    'Legislação de Trânsito',
    'Direção Defensiva',
    'Primeiros Socorros',
    'Meio Ambiente e Cidadania',
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('📚 Categorias criadas.');

  //
  // PHASES
  //
  const phases = [
    {
      category: 'Legislação de Trânsito',
      items: ['Introdução', 'Sinalização', 'Normas de Circulação'],
    },
    {
      category: 'Direção Defensiva',
      items: ['Riscos', 'Prevenção', 'Condições Adversas'],
    },
  ];

  for (const p of phases) {
    const category = await prisma.category.findUnique({
      where: { name: p.category },
    });

    if (!category) continue;

    let order = 1;

    for (const phaseName of p.items) {
      await prisma.phase.upsert({
        where: {
          categoryId_name: {
            categoryId: category.id,
            name: phaseName,
          },
        },
        update: {},
        create: {
          name: phaseName,
          order,
          categoryId: category.id,
        },
      });

      order++;
    }
  }

  console.log('📘 Fases criadas.');

  //
  // SAMPLE QUESTIONS
  //
  const sampleCategory = await prisma.category.findUnique({
    where: { name: 'Legislação de Trânsito' },
  });

  if (sampleCategory) {
    await prisma.question.createMany({
      data: [
        {
          statement: 'Qual é a cor da placa de regulamentação?',
          optionA: 'Vermelha',
          optionB: 'Amarela',
          optionC: 'Azul',
          optionD: 'Verde',
          correct: 'A',
          categoryId: sampleCategory.id,
        },
        {
          statement: 'O que significa uma placa de advertência?',
          optionA: 'Regulamentação',
          optionB: 'Orientação',
          optionC: 'Perigo',
          optionD: 'Destino',
          correct: 'C',
          categoryId: sampleCategory.id,
        },
      ],
      skipDuplicates: true,
    });

    console.log('❓ Questões de exemplo adicionadas.');
  }

  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
