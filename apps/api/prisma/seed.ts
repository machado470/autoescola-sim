import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // -----------------------------------------------------
  // 1) ADMIN USER
  // -----------------------------------------------------
  const adminPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@autoescola.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      xp: 0,
    },
  });

  console.log('✓ Admin criado:', admin.email);

  // -----------------------------------------------------
  // 2) CATEGORY
  // -----------------------------------------------------

  const category = await prisma.category.create({
    data: {
      name: 'Categoria A',
      description: 'Conteúdo para motos e ciclomotores.',
    },
  });

  console.log('✓ Categoria criada:', category.name);

  // -----------------------------------------------------
  // 3) PHASES
  // -----------------------------------------------------

  const phases = await Promise.all([
    prisma.phase.create({
      data: {
        name: 'Fase 1 - Introdução',
        order: 1,
        categoryId: category.id,
      },
    }),

    prisma.phase.create({
      data: {
        name: 'Fase 2 - Sinalização',
        order: 2,
        categoryId: category.id,
      },
    }),

    prisma.phase.create({
      data: {
        name: 'Fase 3 - Direção Defensiva',
        order: 3,
        categoryId: category.id,
      },
    }),
  ]);

  console.log('✓ Fases criadas:', phases.length);

  // -----------------------------------------------------
  // 4) LESSONS POR FASE
  // -----------------------------------------------------

  for (const phase of phases) {
    await prisma.lesson.createMany({
      data: [
        {
          title: `${phase.name} - Aula 1`,
          content: `Conteúdo introdutório da ${phase.name}.`,
          order: 1,
          categoryId: category.id,
          phaseId: phase.id,
        },
        {
          title: `${phase.name} - Aula 2`,
          content: `Conceitos avançados da ${phase.name}.`,
          order: 2,
          categoryId: category.id,
          phaseId: phase.id,
        },
      ],
    });
  }

  console.log('✓ Aulas criadas para cada fase');

  // -----------------------------------------------------
  // 5) QUESTIONS POR FASE
  // -----------------------------------------------------

  for (const phase of phases) {
    await prisma.question.createMany({
      data: [
        {
          statement: `Questão 1 da ${phase.name}`,
          optionA: 'Opção A',
          optionB: 'Opção B',
          optionC: 'Opção C',
          optionD: 'Opção D',
          correct: 'A',
          order: 1,
          categoryId: category.id,
          phaseId: phase.id,
        },
        {
          statement: `Questão 2 da ${phase.name}`,
          optionA: 'Opção A',
          optionB: 'Opção B',
          optionC: 'Opção C',
          optionD: 'Opção D',
          correct: 'B',
          order: 2,
          categoryId: category.id,
          phaseId: phase.id,
        },
        {
          statement: `Questão 3 da ${phase.name}`,
          optionA: 'Opção A',
          optionB: 'Opção B',
          optionC: 'Opção C',
          optionD: 'Opção D',
          correct: 'C',
          order: 3,
          categoryId: category.id,
          phaseId: phase.id,
        },
      ],
    });
  }

  console.log('✓ Questões criadas para cada fase');

  console.log('🌱 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
