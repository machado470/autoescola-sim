import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando tabelas...");
  await prisma.examAnswer.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.phase.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Criando admin...");
  const hash = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      email: 'admin@autoescola.com',
      password: hash,
      name: 'Administrador'
    }
  });

  console.log("📚 Criando categorias...");
  await prisma.category.createMany({
    data: [
      { name: 'Legislação' },
      { name: 'Direção Defensiva' },
      { name: 'Primeiros Socorros' }
    ],
  });

  console.log("🔍 Carregando categorias...");
  const legislacao = await prisma.category.findFirst({ where: { name: 'Legislação' }});
  const defensiva  = await prisma.category.findFirst({ where: { name: 'Direção Defensiva' }});
  const socorros   = await prisma.category.findFirst({ where: { name: 'Primeiros Socorros' }});

  console.log("🧩 Criando fases...");
  const faseLeg1 = await prisma.phase.create({
    data: { name: 'Parte 1', order: 1, categoryId: legislacao!.id }
  });

  const faseLeg2 = await prisma.phase.create({
    data: { name: 'Parte 2', order: 2, categoryId: legislacao!.id }
  });

  const faseDef1 = await prisma.phase.create({
    data: { name: 'Parte 1', order: 1, categoryId: defensiva!.id }
  });

  console.log("❓ Criando questões...");
  await prisma.question.create({
    data: {
      statement: "Qual a velocidade máxima na via urbana (salvo sinalização)?",
      answerA: "30 km/h",
      answerB: "40 km/h",
      answerC: "50 km/h",
      answerD: "60 km/h",
      correct: "C",
      categoryId: legislacao!.id,
      phaseId: faseLeg1.id,
    }
  });

  await prisma.question.create({
    data: {
      statement: "O que fazer em caso de aquaplanagem?",
      answerA: "Frear forte",
      answerB: "Virar o volante repentinamente",
      answerC: "Acelerar para ganhar estabilidade",
      answerD: "Tirar o pé do acelerador e segurar firme",
      correct: "D",
      categoryId: defensiva!.id,
      phaseId: faseDef1.id,
    }
  });

  console.log("🎉 SEED COMPLETO FINALIZADO!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

