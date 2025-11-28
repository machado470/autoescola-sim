import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("\n>> Importando categorias, fases e questões...\n");

  const data = [
    {
      name: "Sinalização",
      phases: [
        {
          name: "Placas de regulamentação",
          questions: [
            {
              statement: "Qual cor indica placa de atenção?",
              answers: [
                { text: "Amarela", isCorrect: true },
                { text: "Vermelha", isCorrect: false },
                { text: "Azul", isCorrect: false },
                { text: "Verde", isCorrect: false }
              ]
            }
          ]
        },
        { name: "Placas de advertência", questions: [] },
        { name: "Placas de indicação", questions: [] }
      ]
    }
  ];

  for (const category of data) {
    const cat = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name }
    });

    console.log(`Categoria OK -> ${cat.name} (id ${cat.id})`);

    for (const phase of category.phases) {
      const ph = await prisma.phase.upsert({
        where: {
          categoryId_name: {
            categoryId: cat.id,
            name: phase.name
          }
        },
        update: {},
        create: {
          name: phase.name,
          order: 1,
          categoryId: cat.id
        }
      });

      console.log(`  Fase OK -> ${ph.name} (id ${ph.id})`);

      for (const q of phase.questions) {
        const correctAnswer =
          q.answers.find(a => a.isCorrect)?.text ?? q.answers[0].text;

        const question = await prisma.question.create({
          data: {
            statement: q.statement,
            phaseId: ph.id,
            categoryId: cat.id,

            answerA: q.answers[0].text,
            answerB: q.answers[1].text,
            answerC: q.answers[2].text,
            answerD: q.answers[3].text,

            correct: correctAnswer,
            chosen: "",

            answers: {
              create: q.answers.map(a => ({
                text: a.text,
                chosen: "",        // <-- OBRIGATÓRIO
                isCorrect: a.isCorrect ?? false
              }))
            }
          }
        });

        console.log(`      Questão criada -> ${question.statement}`);
      }
    }
  }

  console.log("\n>> Importação finalizada!\n");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

