import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Iniciando seed...");

  // ========================
  // CATEGORIA
  // ========================
  const cat1 = await prisma.category.create({
    data: {
      name: "Sinalização de Trânsito",
    },
  });

  // ========================
  // FASE
  // ========================
  const fase1 = await prisma.phase.create({
    data: {
      name: "Placas de Advertência",
      order: 1,
      categoryId: cat1.id,
    },
  });

  // ========================
  // AULA
  // ========================
  await prisma.lesson.create({
    data: {
      title: "Placas - Introdução",
      order: 1,
      content: "Conteúdo inicial da aula...",
      categoryId: cat1.id,
      phaseId: fase1.id,
    },
  });

  // ========================
  // QUESTÃO
  // ========================
  await prisma.question.create({
    data: {
      text: "O que significa a placa A-1?",
      answer: "Curva à esquerda",
      phaseId: fase1.id,
    },
  });

  // ========================
  // USUÁRIOS
  // ========================
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@autoescola.com",
      passwordHash: await bcrypt.hash("123456", 10),
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "Aluno",
      email: "aluno@autoescola.com",
      passwordHash: await bcrypt.hash("123456", 10),
      role: "STUDENT",
    },
  });

  console.log("🌱 Seed finalizado com sucesso!");
}

main().finally(() => prisma.$disconnect());
