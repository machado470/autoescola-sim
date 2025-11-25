import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function buildQuestions(categoryId: number, prefix: string, count = 50) {
  const items: { statement: string; categoryId: number }[] = [];
  for (let i = 1; i <= count; i++) {
    const n = String(i).padStart(2, "0");
    items.push({
      statement: `${prefix} Q${n}: enunciado de exemplo ${n}`,
      categoryId,
    });
  }
  return items;
}

async function main() {
  console.log("🌱 Seed MV2 (150 questões) iniciado...");

  // categorias mínimas
  await prisma.category.createMany({
    data: [
      { id: 1, name: "Sinalizacao" },
      { id: 2, name: "Direcao Defensiva" },
      { id: 3, name: "Mecanica" },
    ],
    skipDuplicates: true,
  });

  // idempotência: limpa perguntas dessas categorias
  await prisma.question.deleteMany({ where: { categoryId: { in: [1, 2, 3] } } });

  // gera 50 por categoria
  const q1 = buildQuestions(1, "Sinalizacao");
  const q2 = buildQuestions(2, "Direcao Defensiva");
  const q3 = buildQuestions(3, "Mecanica");

  // insere em lotes (melhor p/ db)
  const all = [...q1, ...q2, ...q3];
  const chunkSize = 100;
  for (let i = 0; i < all.length; i += chunkSize) {
    const slice = all.slice(i, i + chunkSize);
    await prisma.question.createMany({ data: slice, skipDuplicates: true });
  }

  // contagens
  const categories = await prisma.category.count();
  const questions = await prisma.question.count();

  console.log("✅ Seed concluído.");
  console.log({ categories, questions });
}

main()
  .catch((e) => {
    console.error("❌ Seed falhou:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
