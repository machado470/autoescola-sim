import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function ensureCategories() {
  await prisma.category.upsert({ where: { id: 1 }, update: { name: 'Sinalização' },        create: { id: 1, name: 'Sinalização' } });
  await prisma.category.upsert({ where: { id: 2 }, update: { name: 'Direção Defensiva' },  create: { id: 2, name: 'Direção Defensiva' } });
  await prisma.category.upsert({ where: { id: 3 }, update: { name: 'Mecânica' },           create: { id: 3, name: 'Mecânica' } });
}

function qText(catName: string, i: number) {
  return `${catName} • Questão ${i}`;
}

async function seedCategory(catId: number, catName: string) {
  for (let i = 1; i <= 50; i++) {
    await prisma.question.create({
      data: {
        statement: qText(catName, i),
        categoryId: catId,
        // relacionamento correto no schema
        answers: {
          create: [
            { text: 'Alternativa A', isCorrect: true  },
            { text: 'Alternativa B', isCorrect: false },
            { text: 'Alternativa C', isCorrect: false },
            { text: 'Alternativa D', isCorrect: false },
          ],
        },
      },
    });
  }
}

async function main() {
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();

  await ensureCategories();

  await seedCategory(1, 'Sinalização');
  await seedCategory(2, 'Direção Defensiva');
  await seedCategory(3, 'Mecânica');

  console.log('✅ Seed concluído com 150 questões (50 por categoria).');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
