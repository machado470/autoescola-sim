import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed...");

  // ---------------------------------------------------------
  // ADMIN
  // ---------------------------------------------------------
  const adminEmail = "admin@admin.com";

  const admin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        passwordHash: await bcrypt.hash("123456", 10),
        role: "ADMIN"
      }
    });

    console.log("✔ Admin criado!");
  } else {
    console.log("✔ Admin já existe, pulando criação.");
  }

  // ---------------------------------------------------------
  // CATEGORY
  // ---------------------------------------------------------
  const category = await prisma.category.create({
    data: {
      name: "Categoria A"
    }
  });

  console.log("✔ Categoria criada:", category.name);

  // ---------------------------------------------------------
  // PHASES
  // ---------------------------------------------------------
  const phasesData = [
    { name: "Introdução", order: 1 },
    { name: "Regras Básicas", order: 2 },
    { name: "Sinalização", order: 3 }
  ];

  const phases = [];

  for (const p of phasesData) {
    const phase = await prisma.phase.create({
      data: {
        name: p.name,
        order: p.order,
        categoryId: category.id
      }
    });
    phases.push(phase);
  }

  console.log("✔ Fases criadas:", phases.length);

  // ---------------------------------------------------------
  // LESSONS + QUESTIONS
  // ---------------------------------------------------------
  for (const phase of phases) {

    // 3 lessons por fase
    for (let i = 1; i <= 3; i++) {
      await prisma.lesson.create({
        data: {
          title: `Aula ${i} da fase ${phase.name}`,
          content: `Conteúdo da aula ${i}.`,
          order: i,
          categoryId: category.id,
          phaseId: phase.id
        }
      });
    }

    // 3 questions por fase
    for (let i = 1; i <= 3; i++) {
      await prisma.question.create({
        data: {
          statement: `Pergunta ${i} da fase ${phase.name}?`,
          optionA: "Opção A",
          optionB: "Opção B",
          optionC: "Opção C",
          optionD: "Opção D",
          correct: "A",
          order: i,
          categoryId: category.id,
          phaseId: phase.id
        }
      });
    }
  }

  console.log("✔ Lessons e Questions criadas!");
}

main()
  .then(() => console.log("🌱 Seed finalizado!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
