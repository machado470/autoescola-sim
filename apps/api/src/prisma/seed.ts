import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed completo...\n");

  const adminEmail = "admin@local";
  const adminPassword = "admin";

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!adminExists) {
    const hash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        passwordHash: hash,
        role: "ADMIN"
      }
    });

    console.log("✔ Admin criado:", adminEmail);
  } else {
    console.log("✔ Admin já existe, ignorando criação.");
  }

  const categoriesData = [
    { name: "Sinalização", description: "Regras e padrões de sinalização" },
    { name: "Direção Defensiva", description: "Prevenção e segurança" },
    { name: "Mecânica", description: "Conhecimentos básicos de veículo" }
  ];

  const categories = [];

  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat
    });

    categories.push(category);
    console.log(`✔ Categoria OK -> ${category.name}`);
  }

  const phasesTemplate = [
    "Fase 1 - Introdução",
    "Fase 2 - Conceitos Básicos",
    "Fase 3 - Aplicação Prática",
    "Fase 4 - Análise de Cenários",
    "Fase 5 - Regras Importantes",
    "Fase 6 - Preparação para Prova",
    "Fase 7 - Revisão Final"
  ];

  for (const category of categories) {
    for (let i = 0; i < phasesTemplate.length; i++) {
      await prisma.phase.upsert({
        where: {
          categoryId_name: {
            categoryId: category.id,
            name: phasesTemplate[i]
          }
        },
        update: {},
        create: {
          name: phasesTemplate[i],
          order: i + 1,
          categoryId: category.id
        }
      });
    }
    console.log(`✔ Fases criadas para ${category.name}`);
  }

  const allPhases = await prisma.phase.findMany();

  for (const phase of allPhases) {
    await prisma.lesson.createMany({
      data: [
        {
          title: "Introdução ao Tema",
          content: "Conteúdo introdutório desta fase.",
          order: 1,
          categoryId: phase.categoryId,
          phaseId: phase.id
        },
        {
          title: "Conteúdo Principal",
          content: "Explicação detalhada do assunto.",
          order: 2,
          categoryId: phase.categoryId,
          phaseId: phase.id
        }
      ],
      skipDuplicates: true
    });
  }

  console.log("✔ Aulas adicionadas.");

  for (const phase of allPhases) {
    await prisma.question.upsert({
      where: {
        categoryId_statement: {
          categoryId: phase.categoryId,
          statement: `Pergunta da ${phase.name}`
        }
      },
      update: {},
      create: {
        statement: `Pergunta da ${phase.name}`,
        optionA: "Opção A",
        optionB: "Opção B",
        optionC: "Opção C",
        optionD: "Opção D",
        correct: "Opção A",
        order: 1,
        categoryId: phase.categoryId,
        phaseId: phase.id
      }
    });
  }

  console.log("✔ Questões criadas.");

  console.log("\n🎉 Seed finalizado com sucesso!");
}

main()
  .catch((err) => {
    console.error("Erro no seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
