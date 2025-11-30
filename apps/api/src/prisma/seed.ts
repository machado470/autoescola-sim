import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  // --- Categoria ---
  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Geral',
    },
  });

  // --- Fase ---
  const fase = await prisma.fase.create({
    data: {
      titulo: 'Introdução',
      categoriaId: categoria.id,
    },
  });

  // --- Perguntas ---
  await prisma.pergunta.createMany({
    data: [
      {
        enunciado: 'Qual a velocidade máxima em via urbana?',
        alternativaA: '30 km/h',
        alternativaB: '40 km/h',
        alternativaC: '50 km/h',
        alternativaD: '60 km/h',
        correta: 'C',
        faseId: fase.id,
        categoriaId: categoria.id,
      },
      {
        enunciado: 'O que significa placa de fundo amarelo?',
        alternativaA: 'Advertência',
        alternativaB: 'Regulamentação',
        alternativaC: 'Indicação',
        alternativaD: 'Serviços',
        correta: 'A',
        faseId: fase.id,
        categoriaId: categoria.id,
      },
    ],
  });

  console.log('Seed aplicado com sucesso!');
}

main().finally(() => prisma.$disconnect());
