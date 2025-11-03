export const questions = [
  {
    id: 1,
    category: "Sinalização",
    question: "O que esse sinal indica?",
    image: "/icons/stop.svg",
    options: [
      { id: "a", text: "Siga em frente" },
      { id: "b", text: "Ponto de ônibus" },
      { id: "c", text: "Parada obrigatória", correct: true },
      { id: "d", text: "Atenção: cruzamento" }
    ]
  },
  {
    id: 2,
    category: "Direção Defensiva",
    question: "Qual atitude é correta em pista molhada?",
    options: [
      { id: "a", text: "Aumentar a velocidade" },
      { id: "b", text: "Diminuir a distância de segurança" },
      { id: "c", text: "Reduzir a velocidade e manter distância", correct: true },
      { id: "d", text: "Usar farol alto" }
    ]
  },
  {
    id: 3,
    category: "Mecânica",
    question: "A função do óleo do motor é:",
    options: [
      { id: "a", text: "Aumentar o atrito" },
      { id: "b", text: "Lubrificar e reduzir o desgaste", correct: true },
      { id: "c", text: "Resfriar o radiador" },
      { id: "d", text: "Melhorar o consumo de combustível" }
    ]
  }
];
