import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco...');

  // ------------------------------------------------------------
  // 1) LIMPA TABELAS
  // ------------------------------------------------------------
  await prisma.$transaction([
    prisma.question.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.phase.deleteMany(),
    prisma.category.deleteMany(),
    prisma.studentProgress.deleteMany(),
    prisma.quizSession.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('✔ Banco limpo');

  // ------------------------------------------------------------
  // 2) ADMIN PADRÃO
  // ------------------------------------------------------------
  const password = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@autoescola.com',
      password,
      role: 'ADMIN',
    },
  });

  console.log('✔ Admin criado:', admin.email);

  // ------------------------------------------------------------
  // 3) CATEGORIAS
  // ------------------------------------------------------------
  const categoriesData = [
    { name: 'Legislação de Trânsito' },
    { name: 'Direção Defensiva' },
    { name: 'Primeiros Socorros' },
    { name: 'Meio Ambiente' },
    { name: 'Noções de Mecânica' },
  ];

  await prisma.category.createMany({ data: categoriesData });
  console.log('✔ Categorias criadas:', categoriesData.length);

  const categories = await prisma.category.findMany();

  // ------------------------------------------------------------
  // 4) FASES
  // ------------------------------------------------------------
  const phasesData = categories.map((c, i) => ({
    name: `Fase ${i + 1}`,
    order: i + 1,
    categoryId: c.id,
  }));

  await prisma.phase.createMany({ data: phasesData });
  console.log('✔ Fases criadas:', phasesData.length);

  // ------------------------------------------------------------
  // 5) QUESTÕES DEMONSTRATIVAS (AGORA NO FORMATO CORRETO)
  // ------------------------------------------------------------
  const demoQuestions = [
    {
      statement: 'O que significa a placa R-1?',
      optionA: 'Pare',
      optionB: 'Atenção',
      optionC: 'Velocidade máxima',
      optionD: 'Proibido seguir',
      correct: 'Pare',
      categoryId: categories[0].id,
    },
    {
      statement: 'Qual a distância segura ao veículo da frente?',
      optionA: '1 metro',
      optionB: '10 metros',
      optionC: 'Regra dos 2 segundos',
      optionD: '5 metros',
      correct: 'Regra dos 2 segundos',
      categoryId: categories[1].id,
    },
  ];

  for (const q of demoQuestions) {
    await prisma.question.create({ data: q });
  }

  console.log('✔ Questões criadas:', demoQuestions.length);

  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
