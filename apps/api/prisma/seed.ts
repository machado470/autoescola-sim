import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando SEED...");

  const adminPassword = await bcrypt.hash("123456", 10);
  const studentPassword = await bcrypt.hash("123456", 10);

  // ADMIN
  const admin = await prisma.user.upsert({
    where: { email: "admin@autoescola.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@autoescola.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  // ALUNO
  const student = await prisma.user.upsert({
    where: { email: "aluno@autoescola.com" },
    update: {},
    create: {
      name: "Aluno Teste",
      email: "aluno@autoescola.com",
      passwordHash: studentPassword,
      role: "STUDENT",
    },
  });

  console.log("Usuários criados.");

  // CATEGORIA
  const category = await prisma.category.upsert({
    where: { name: "Categoria A" },
    update: {},
    create: {
      name: "Categoria A",
      description: "Categoria básica de treinamento",
    },
  });

  // FASES
  const fase1 = await prisma.phase.upsert({
    where: { categoryId_name: { categoryId: category.id, name: "Fase 1 — Noções Básicas" } },
    update: {},
    create: {
      name: "Fase 1 — Noções Básicas",
      order: 1,
      categoryId: category.id,
    },
  });

  // AULAS
  await prisma.lesson.createMany({
    data: [
      {
        title: "Introdução ao Trânsito",
        content: "Conteúdo básico...",
        categoryId: category.id,
        phaseId: fase1.id,
      },
      {
        title: "Comandos do Veículo",
        content: "Aprendendo os controles...",
        categoryId: category.id,
        phaseId: fase1.id,
      },
    ],
  });

  // PERGUNTAS
  await prisma.question.createMany({
    data: [
      {
        statement: "Para que serve o cinto?",
        optionA: "Estética",
        optionB: "Proteção",
        optionC: "Segurar roupas",
        optionD: "Nada",
        correct: "B",
        categoryId: category.id,
        phaseId: fase1.id,
      },
      {
        statement: "Semáforo amarelo significa?",
        optionA: "Acelerar",
        optionB: "Frear forte",
        optionC: "Reduzir e preparar para parar",
        optionD: "Nada",
        correct: "C",
        categoryId: category.id,
        phaseId: fase1.id,
      },
    ],
  });

  // PROGRESSO DO ALUNO
  await prisma.studentProgress.create({
    data: {
      userId: student.id,
      phaseId: fase1.id,
      lessonsCompleted: 0,
      correctAnswers: 0,
      finished: false,
    },
  });

  console.log("🌱 SEED FINALIZADO!");
}

main().finally(() => prisma.$disconnect());
