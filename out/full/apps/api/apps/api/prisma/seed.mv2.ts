import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed MV2 iniciado...");

  // Cria categorias (usando id e name)
  await prisma.category.createMany({
    data: [
      { id: 1, name: "Sinalizacao" },
      { id: 2, name: "Direcao Defensiva" },
      { id: 3, name: "Mecanica" }
    ],
    skipDuplicates: true
  });

  console.log("📚 Categorias prontas.");

  // Cria perguntas com campo "question"
  await prisma.question.createMany({
    data: [
      {
        question: "Qual cor indica parada obrigatória?",
        options: ["Vermelho", "Verde", "Azul", "Amarelo"],
        correctAnswer: "Vermelho",
        categoryId: 1
      },
      {
        question: "Manter distância de segurança reduz o quê?",
        options: ["Risco de colisão", "Consumo", "Confiança", "Velocidade"],
        correctAnswer: "Risco de colisão",
        categoryId: 2
      },
      {
        question: "Quando revisar o sistema de freios do veículo?",
        options: ["A cada 10.000 km", "Somente se falhar", "A cada 50.000 km", "Nunca"],
        correctAnswer: "A cada 10.000 km",
        categoryId: 3
      }
    ],
    skipDuplicates: true
  });

  console.log("✅ Perguntas criadas com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🏁 Seed MV2 finalizado.");
  });
