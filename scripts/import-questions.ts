import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(">> Importando categorias e questões...");

  const categories = [
    "Sinalização",
    "Infrações",
    "Direção defensiva",
    "Primeiros socorros",
  ];

  const categoryMap: Record<string, number> = {};

  for (const name of categories) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categoryMap[name] = cat.id;
    console.log(`Categoria OK -> ${name} (id ${cat.id})`);
  }

  const questions = [
    {
      statement: "Qual cor indica placa de atenção?",
      image: "/icons/attention.svg",
      category: "Sinalização",
      answers: [
        { text: "Amarela", isCorrect: true },
        { text: "Vermelha", isCorrect: false },
        { text: "Azul", isCorrect: false },
        { text: "Verde", isCorrect: false },
      ],
    },
    {
      statement: "Placa vermelha indica?",
      image: "/icons/stop.svg",
      category: "Sinalização",
      answers: [
        { text: "Advertência", isCorrect: false },
        { text: "Regulamentação", isCorrect: true },
        { text: "Indicação", isCorrect: false },
        { text: "Orientação", isCorrect: false },
      ],
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        statement: q.statement,
        image: q.image,
        categoryId: categoryMap[q.category],
        answers: {
          create: q.answers.map(a => ({
            text: a.text,
            isCorrect: a.isCorrect,
          })),
        },
      },
    });

    console.log(`Questão OK -> ${q.statement}`);
  }

  console.log(">> Import finalizado.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
