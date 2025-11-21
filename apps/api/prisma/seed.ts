import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log(">> Limpando tabelas...");

  await prisma.examAnswer.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.simuladoAnswer.deleteMany();
  await prisma.simuladoSession.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.phase.deleteMany();

  console.log(">> Criando phase padrão...");
  const phase1 = await prisma.phase.create({
    data: {
      name: "Fase 1",
      order: 1
    }
  });

  console.log(">> Criando questões...");
  await prisma.question.create({
    data: {
      statement: "Qual a velocidade máxima permitida em vias urbanas, salvo sinalização em contrário?",
      difficulty: "easy",
      category: "legislacao",
      phaseId: phase1.id,
      answers: {
        create: [
          { text: "30 km/h", correct: false },
          { text: "40 km/h", correct: false },
          { text: "50 km/h", correct: true },
          { text: "60 km/h", correct: false }
        ]
      }
    }
  });

  await prisma.question.create({
    data: {
      statement: "O uso do cinto de segurança é obrigatório para:",
      difficulty: "easy",
      category: "legislacao",
      phaseId: phase1.id,
      answers: {
        create: [
          { text: "Somente motorista", correct: false },
          { text: "Motorista e passageiros", correct: true },
          { text: "Apenas passageiros do banco traseiro", correct: false },
          { text: "Apenas passageiros do banco dianteiro", correct: false }
        ]
      }
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
