import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Question {
  category: string;
  statement: string;
  options: string[];
  correctIndex: number;
  image?: string;
}

const questions: Question[] = [
  {
    category: 'Sinalização',
    statement: 'Qual cor indica placa de atenção?',
    options: ['Amarela', 'Vermelha', 'Verde', 'Azul'],
    correctIndex: 0,
    image: '/icons/attention.svg',
  },
  {
    category: 'Direção Defensiva',
    statement: 'Qual a distância segura em estrada?',
    options: ['1 segundo', '2 segundos', '5 segundos', '0,5 segundo'],
    correctIndex: 1,
  },
  {
    category: 'Mecânica',
    statement: 'O que indica a luz de óleo no painel?',
    options: ['Falta de óleo', 'Porta aberta', 'Farol ligado', 'Cinto desprendido'],
    correctIndex: 0,
  },
  {
    category: 'Legislação',
    statement: 'Quantos pontos suspendem a CNH?',
    options: ['10 pontos', '20 pontos', '40 pontos', '60 pontos'],
    correctIndex: 2,
  },
  {
    category: 'Primeiros Socorros',
    statement: 'Qual o número de emergência para acidentes?',
    options: ['192', '190', '193', '191'],
    correctIndex: 0,
  },
];

async function upsertCategory(name: string) {
  return prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function main() {
  for (const q of questions) {
    const cat = await upsertCategory(q.category);
    const answers = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));
    await prisma.question.create({
      data: {
        statement: q.statement,
        image: q.image ?? null,
        categoryId: cat.id,
        answers: {
          create: answers,
        },
      },
    });
    console.log(`Inserida pergunta: ${q.statement}`);
  }
  console.log('Importação concluída.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
