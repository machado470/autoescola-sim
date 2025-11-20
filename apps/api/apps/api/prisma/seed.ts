import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🔥 Limpando tabelas...");
  await prisma.examAnswer.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.userPhaseProgress.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.phase.deleteMany();

  console.log("🔥 Criando fases...");
  await prisma.phase.createMany({
    data: [
      { id: 1, title: "Fase 1 – Fundamentos", order: 1 },
      { id: 2, title: "Fase 2 – Direção Defensiva", order: 2 },
      { id: 3, title: "Fase 3 – Placas de Trânsito", order: 3 },
      { id: 4, title: "Fase 4 – Meio Ambiente", order: 4 },
      { id: 5, title: "Fase 5 – Primeiros Socorros", order: 5 },
      { id: 6, title: "Fase 6 – Infrações & Penalidades", order: 6 },
      { id: 7, title: "Fase 7 – Cidadania", order: 7 },
      { id: 8, title: "Fase 8 – Revisão Final", order: 8 },
    ],
  });

  // ============================================================
  // 🚀 FASE 1 — FUNDAMENTOS
  // ============================================================

  console.log("🔥 Inserindo Fase 1...");

  await prisma.question.create({
    data: {
      statement: "A sinalização de trânsito tem como principal objetivo:",
      category: "Fundamentos",
      difficulty: 1,
      phaseId: 1,
      answers: {
        create: [
          { text: "Decorado impedir acidentes", correct: false },
          { text: "Organizar e orientar o fluxo de veículos e pedestres", correct: true },
          { text: "Servir apenas como indicação visual", correct: false },
          { text: "Alertar somente sobre obras na via", correct: false },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      statement: "O trânsito é definido pelo CTB como:",
      category: "Fundamentos",
      difficulty: 1,
      phaseId: 1,
      answers: {
        create: [
          { text: "Movimentação exclusiva de veículos automotores", correct: false },
          { text: "Movimentação e imobilização de pessoas, animais e veículos", correct: true },
          { text: "Deslocamento apenas de veículos", correct: false },
          { text: "Movimentação apenas em rodovias", correct: false },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      statement: "A educação para o trânsito é responsabilidade:",
      category: "Fundamentos",
      difficulty: 1,
      phaseId: 1,
      answers: {
        create: [
          { text: "Somente do CONTRAN", correct: false },
          { text: "Exclusivamente das autoescolas", correct: false },
          { text: "De todos os órgãos do Sistema Nacional de Trânsito", correct: true },
          { text: "Apenas das prefeituras", correct: false },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      statement: "O condutor defensivo costuma:",
      category: "Fundamentos",
      difficulty: 2,
      phaseId: 1,
      answers: {
        create: [
          { text: "Dirigir sempre acima da velocidade mínima", correct: false },
          { text: "Prever situações de risco e agir antes que aconteçam", correct: true },
          { text: "Confiar totalmente nas habilidades de outros condutores", correct: false },
          { text: "Dirigir apenas olhando para frente", correct: false },
        ],
      },
    },
  });

  const fase1Extra = [
    ["O CTB é aplicado em todo:", "território nacional"],
    ["Quem tem prioridade no trânsito?", "pedestre"],
    ["Qual ação reduz acidentes?", "manter distância segura"],
  ];

  for (const [statement, correta] of fase1Extra) {
    await prisma.question.create({
      data: {
        statement,
        category: "Fundamentos",
        difficulty: 1,
        phaseId: 1,
        answers: {
          create: [
            { text: correta, correct: true },
            { text: "Opção incorreta", correct: false },
            { text: "Outra incorreta", correct: false },
            { text: "Mais uma incorreta", correct: false },
          ],
        },
      },
    });
  }

  console.log("🔥 Fase 1 finalizada!");

  // ============================================================
  // 🚀 FASE 2 — DIREÇÃO DEFENSIVA
  // ============================================================

  console.log("🔥 Inserindo Fase 2...");

  await prisma.question.create({
    data: {
      statement: "Dirigir defensivamente significa:",
      category: "Direção Defensiva",
      difficulty: 1,
      phaseId: 2,
      answers: {
        create: [
          { text: "Evitar sempre dirigir à noite", correct: false },
          { text: "Prever riscos e agir de forma preventiva", correct: true },
          { text: "Confiar na habilidade dos outros motoristas", correct: false },
          { text: "Usar buzina sempre para se impor no trânsito", correct: false },
        ],
      },
    },
  });

  await prisma.question.create({
    data: {
      statement: "O que é 'ponto cego' do veículo?",
      category: "Direção Defensiva",
      difficulty: 1,
      phaseId: 2,
      answers: {
        create: [
          { text: "Área visível apenas com farol alto", correct: false },
          { text: "Área ao redor do veículo que o motorista não consegue ver", correct: true },
          { text: "Parte traseira iluminada pela lanterna", correct: false },
          { text: "Reflexo causado pelo sol no para-brisa", correct: false },
        ],
      },
    },
  });

  const fase2Extra = [
    ["O que reduz acidentes com motociclistas?", "olhar duas vezes antes de mudar de faixa"],
    ["Em neblina, o que fazer?", "usar faróis baixos"],
    ["Como evitar fadiga ao volante?", "parar a cada 2 horas"],
  ];

  for (const [statement, correta] of fase2Extra) {
    await prisma.question.create({
      data: {
        statement,
        category: "Direção Defensiva",
        difficulty: 1,
        phaseId: 2,
        answers: {
          create: [
            { text: correta, correct: true },
            { text: "Opção incorreta", correct: false },
            { text: "Outra incorreta", correct: false },
            { text: "Mais uma incorreta", correct: false },
          ],
        },
      },
    });
  }

  console.log("🔥 Fase 2 finalizada!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
