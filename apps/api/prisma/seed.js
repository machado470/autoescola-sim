const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  console.log(">> Seed JS rodando...");

  await prisma.examAnswer.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.question.deleteMany();
  await prisma.category.deleteMany();
  await prisma.phase.deleteMany();
  await prisma.user.deleteMany();

  const fase1 = await prisma.phase.create({
    data: { name: "Simulado Geral", order: 1 }
  });

  const catSinalizacao = await prisma.category.create({
    data: { name: "Sinalização" }
  });

  const catRegras = await prisma.category.create({
    data: { name: "Regras de Circulação" }
  });

  await prisma.question.create({
    data: {
      statement: "Qual a velocidade máxima permitida em vias urbanas, salvo sinalização em contrário?",
      respostaA: "30 km/h",
      respostaB: "40 km/h",
      respostaC: "50 km/h",
      respostaD: "60 km/h",
      correta: "C",
      categoryId: catRegras.id,
      phaseId: fase1.id
    }
  });

  await prisma.question.create({
    data: {
      statement: "Qual cor indica advertência na sinalização de trânsito?",
      respostaA: "Verde",
      respostaB: "Vermelho",
      respostaC: "Amarelo",
      respostaD: "Azul",
      correta: "C",
      categoryId: catSinalizacao.id,
      phaseId: fase1.id
    }
  });

  await prisma.question.create({
    data: {
      statement: "A placa de 'Pare' é de qual formato?",
      respostaA: "Quadrado",
      respostaB: "Triângulo",
      respostaC: "Hexágono",
      respostaD: "Octógono",
      correta: "D",
      categoryId: catSinalizacao.id,
      phaseId: fase1.id
    }
  });

  const hash = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@autoescola.com",
      password: hash,
      name: "Administrador"
    }
  });

  console.log(">> Seed finalizado!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
