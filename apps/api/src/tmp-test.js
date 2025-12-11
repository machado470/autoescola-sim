console.log("=== TESTE PRISMA ===");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Buscando questões no banco...");

  const questions = await prisma.question.findMany({
    take: 5,
  });

  console.log("Total encontradas:", questions.length);
  console.log(questions);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
