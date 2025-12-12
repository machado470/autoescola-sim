import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("👉 Inserindo categorias, fases e aulas...");

  // -----------------------------
  // Categoria
  // -----------------------------
  let category = await prisma.category.findFirst({
    where: { name: "Categoria A/B" },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: "Categoria A/B" },
    });
  }

  // -----------------------------
  // Fase 1
  // -----------------------------
  let phase = await prisma.phase.findFirst({
    where: {
      name: "Fase 1",
      categoryId: category.id,
    },
  });

  if (!phase) {
    phase = await prisma.phase.create({
      data: {
        name: "Fase 1",
        order: 1,
        categoryId: category.id,
      },
    });
  }

  // -----------------------------
  // Aula 1
  // -----------------------------
  let aula1 = await prisma.lesson.findFirst({
    where: { title: "Introdução ao Trânsito" },
  });

  if (!aula1) {
    await prisma.lesson.create({
      data: {
        title: "Introdução ao Trânsito",
        order: 1,
        content: "Conteúdo da aula 1",
        categoryId: category.id,
        phaseId: phase.id,
      },
    });
  }

  // -----------------------------
  // Aula 2
  // -----------------------------
  let aula2 = await prisma.lesson.findFirst({
    where: { title: "Sinalização Básica" },
  });

  if (!aula2) {
    await prisma.lesson.create({
      data: {
        title: "Sinalização Básica",
        order: 2,
        content: "Conteúdo da aula 2",
        categoryId: category.id,
        phaseId: phase.id,
      },
    });
  }

  console.log("🌱 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
