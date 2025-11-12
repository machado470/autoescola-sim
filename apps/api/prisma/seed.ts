import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@local' },
    update: {},
    create: {
      email: 'admin@local',
      password: 'admin',
      name: 'Administrador',
    },
  });

  // 50 perguntas de teste
  const questions = Array.from({ length: 50 }).map((_, i) => ({
    enunciado: `Pergunta ${i + 1}: o que significa o sinal número ${i + 1}?`,
    alternativas: ['A', 'B', 'C', 'D'].map((letra) => `${letra}) alternativa ${letra}`),
    correta: 'A',
    categoriaId: 1,
  }));

  await prisma.question.createMany({ data: questions });
  console.log(`✅ Seed concluído com ${questions.length} perguntas e usuário ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
