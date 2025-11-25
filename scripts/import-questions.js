const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(">> Importando categorias e questões...");

  const cat = await prisma.category.upsert({
    where: { name: "Sinalização" },
    update: {},
    create: { name: "Sinalização" }
  });

  const q = await prisma.question.create({
    data: {
      statement: "Qual cor indica placa de atenção?",
      categoryId: cat.id,
      answers: {
        create: [
          { text: "Amarela", correct: true },
          { text: "Vermelha", correct: false },
          { text: "Azul", correct: false },
        ]
      }
    }
  });

  console.log("Criada:", q.id);
}

main().finally(() => prisma.$disconnect());

