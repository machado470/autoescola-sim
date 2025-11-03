/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function upsertCategory(name: string) {
  return prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

// helper para criar pergunta + respostas
async function createQ(catId: number, statement: string, options: Array<{text:string, correct?:boolean}>, image?: string) {
  return prisma.question.create({
    data: {
      statement,
      image,
      categoryId: catId,
      answers: {
        create: options.map(o => ({ text: o.text, correct: !!o.correct }))
      }
    }
  });
}

async function main() {
  const sinal = await upsertCategory("Sinalização");
  const direc = await upsertCategory("Direção Defensiva");
  const mecan = await upsertCategory("Mecânica");

  // --- SINALIZAÇÃO (12) ---
  await createQ(sinal.id, "O que a placa octogonal vermelha indica?", [
    { text: "Siga em frente" },
    { text: "Parada obrigatória", correct: true },
    { text: "Atenção: escola" },
    { text: "Proibido estacionar" },
  ], "/icons/stop.svg");

  await createQ(sinal.id, "Placa R-3 (círculo vermelho com barra sobre seta à esquerda) indica:", [
    { text: "Proibido estacionar à esquerda" },
    { text: "Proibido conversão à esquerda", correct: true },
    { text: "Curva perigosa à esquerda" },
    { text: "Mão dupla" },
  ]);

  await createQ(sinal.id, "Placa de advertência A-1a (curva à direita) orienta:", [
    { text: "Início de pista dupla" },
    { text: "Curva acentuada à direita", correct: true },
    { text: "Pista escorregadia" },
    { text: "Trânsito de ciclistas" },
  ]);

  await createQ(sinal.id, "Faixa de pedestres (zebrinha) sinaliza:", [
    { text: "Proibido pedestres" },
    { text: "Área escolar" },
    { text: "Travessia de pedestres", correct: true },
    { text: "Passagem de nível" },
  ]);

  await createQ(sinal.id, "Placa R-6b (proibido estacionar e parar):", [
    { text: "Permite curta parada" },
    { text: "Proíbe parar e estacionar", correct: true },
    { text: "Zona azul" },
    { text: "Somente carga/descarga" },
  ]);

  await createQ(sinal.id, "Placa A-32 (pista escorregadia):", [
    { text: "Pista com pedras" },
    { text: "Pista molhada frequentemente", correct: true },
    { text: "Ponte estreita" },
    { text: "Ventos laterais" },
  ]);

  await createQ(sinal.id, "Placa R-19 (velocidade máxima):", [
    { text: "Recomendação de velocidade" },
    { text: "Limite de velocidade", correct: true },
    { text: "Velocidade mínima" },
    { text: "Velocidade média" },
  ]);

  await createQ(sinal.id, "Linha contínua amarela no centro da via:", [
    { text: "Permite ultrapassar" },
    { text: "Proíbe ultrapassagem", correct: true },
    { text: "Faixa exclusiva ônibus" },
    { text: "Estacionamento permitido" },
  ]);

  await createQ(sinal.id, "Placa A-24 (animais na pista):", [
    { text: "Circo próximo" },
    { text: "Fauna silvestre na via", correct: true },
    { text: "Zoológico" },
    { text: "Pastagem" },
  ]);

  await createQ(sinal.id, "Sinalização horizontal de triângulo branco aponta:", [
    { text: "Parada obrigatória" },
    { text: "Dê a preferência", correct: true },
    { text: "Travessia escolar" },
    { text: "Redutor de velocidade" },
  ]);

  await createQ(sinal.id, "Placa R-1 (preferencial):", [
    { text: "Você perde a preferência" },
    { text: "Via com prioridade de passagem", correct: true },
    { text: "Via de mão dupla" },
    { text: "Área de pedágio" },
  ]);

  await createQ(sinal.id, "Placa A-18 (declive acentuado) recomenda:", [
    { text: "Usar ponto morto" },
    { text: "Reduzir marcha e usar freio-motor", correct: true },
    { text: "Aumentar velocidade" },
    { text: "Desligar faróis" },
  ]);

  // --- DIREÇÃO DEFENSIVA (12) ---
  await createQ(direc.id, "Em pista molhada, atitude mais segura é:", [
    { text: "Aumentar velocidade" },
    { text: "Reduzir velocidade e ampliar distância", correct: true },
    { text: "Usar farol alto" },
    { text: "Frenagens bruscas" },
  ]);

  await createQ(direc.id, "Hidroplanagem ocorre quando:", [
    { text: "Água forma película entre pneu e pista", correct: true },
    { text: "Pneu está acima da calibragem" },
    { text: "Freio ABS falha" },
    { text: "Motor superaquece" },
  ]);

  await createQ(direc.id, "Distância de seguimento adequada em via urbana seca:", [
    { text: "1 segundo" },
    { text: "2 segundos", correct: true },
    { text: "4 segundos" },
    { text: "0,5 segundo" },
  ]);

  await createQ(direc.id, "Atitude ao ver bola entrando na via:", [
    { text: "Manter velocidade" },
    { text: "Reduzir e redobrar atenção", correct: true },
    { text: "Buzinar e acelerar" },
    { text: "Desligar faróis" },
  ]);

  await createQ(direc.id, "Condução noturna segura:", [
    { text: "Farol alto sempre" },
    { text: "Ajustar faróis e reduzir velocidade", correct: true },
    { text: "Rodar sem farol" },
    { text: "Ultrapassar com frequência" },
  ]);

  await createQ(direc.id, "Ultrapassagem só deve ocorrer quando:", [
    { text: "Houver faixa contínua" },
    { text: "Houver visibilidade e faixa seccionada", correct: true },
    { text: "Em curvas" },
    { text: "Pista molhada" },
  ]);

  await createQ(direc.id, "Em aquaplanagem, você deve:", [
    { text: "Frear forte" },
    { text: "Tirar o pé do acelerador e segurar firme", correct: true },
    { text: "Girar o volante rapidamente" },
    { text: "Puxar freio de mão" },
  ]);

  await createQ(direc.id, "Cinto de segurança:", [
    { text: "Opcional no banco traseiro" },
    { text: "Obrigatório para todos", correct: true },
    { text: "Dispensável para gestantes" },
    { text: "Só em rodovias" },
  ]);

  await createQ(direc.id, "Uso de celular dirigindo:", [
    { text: "Permitido em viva-voz com manuseio eventual" },
    { text: "Proibido manusear; foco total na direção", correct: true },
    { text: "Livre em baixa velocidade" },
    { text: "Permitido em semáforo" },
  ]);

  await createQ(direc.id, "Fadiga ao volante:", [
    { text: "Não afeta reflexos" },
    { text: "Aumenta o tempo de reação", correct: true },
    { text: "Melhora eficiência" },
    { text: "Dispensa paradas" },
  ]);

  await createQ(direc.id, "Direção defensiva prioriza:", [
    { text: "Chegar mais rápido" },
    { text: "Prevenir acidentes mesmo com erro de terceiros", correct: true },
    { text: "Usar buzina frequentemente" },
    { text: "Ultrapassar sempre pela direita" },
  ]);

  await createQ(direc.id, "Em aproximação de cruzamento sem sinalização:", [
    { text: "Veículo da esquerda tem preferência" },
    { text: "Veículo da direita tem preferência", correct: true },
    { text: "O maior veículo passa primeiro" },
    { text: "Quem buzina passa" },
  ]);

  // --- MECÂNICA (12) ---
  await createQ(mecan.id, "Função principal do óleo do motor:", [
    { text: "Aumentar atrito" },
    { text: "Lubrificar e reduzir desgaste", correct: true },
    { text: "Substituir combustível" },
    { text: "Resfriar pneus" },
  ]);

  await createQ(mecan.id, "Deve-se calibrar pneus:", [
    { text: "Somente com pneus frios", correct: true },
    { text: "Após rodar longas distâncias" },
    { text: "Quando chover" },
    { text: "Nunca" },
  ]);

  await createQ(mecan.id, "Temperatura elevada do motor indica:", [
    { text: "Nível baixo de fluido de arrefecimento", correct: true },
    { text: "Pneu furado" },
    { text: "Óleo em excesso" },
    { text: "Bateria fraca" },
  ]);

  await createQ(mecan.id, "Pastilhas de freio gastas podem causar:", [
    { text: "Freio mais eficiente" },
    { text: "Barulho e perda de eficiência", correct: true },
    { text: "Melhor consumo" },
    { text: "Direção mais leve" },
  ]);

  await createQ(mecan.id, "Correia dentada rompida tende a:", [
    { text: "Melhorar desempenho" },
    { text: "Parar o motor e causar danos", correct: true },
    { text: "Diminuir consumo" },
    { text: "Aumentar aderência" },
  ]);

  await createQ(mecan.id, "Filtro de ar sujo:", [
    { text: "Melhora potência" },
    { text: "Prejudica mistura e consumo", correct: true },
    { text: "Esfria o motor" },
    { text: "Não tem efeito" },
  ]);

  await createQ(mecan.id, "Luz da bateria acesa em marcha indica:", [
    { text: "Alternador sem carga", correct: true },
    { text: "Pneu murcho" },
    { text: "Combustível baixo" },
    { text: "Freio acionado" },
  ]);

  await createQ(mecan.id, "Alinhamento e balanceamento evitam:", [
    { text: "Desgaste irregular e vibrações", correct: true },
    { text: "Ruído do motor" },
    { text: "Vazamento de óleo" },
    { text: "Superaquecimento" },
  ]);

  await createQ(mecan.id, "Combustível adulterado pode:", [
    { text: "Limpar bicos injetores" },
    { text: "Danos ao sistema e aumento de consumo", correct: true },
    { text: "Melhorar torque" },
    { text: "Aumentar vida útil do óleo" },
  ]);

  await createQ(mecan.id, "Velas de ignição em mau estado causam:", [
    { text: "Marcha lenta estável" },
    { text: "Falhas e consumo maior", correct: true },
    { text: "Direção mais firme" },
    { text: "Freio mais curto" },
  ]);

  await createQ(mecan.id, "Liquido de arrefecimento correto é:", [
    { text: "Apenas água" },
    { text: "Mistura água + aditivo específico", correct: true },
    { text: "Álcool" },
    { text: "Óleo" },
  ]);

  await createQ(mecan.id, "Luz de injeção acesa constantemente:", [
    { text: "Indica necessidade de diagnóstico", correct: true },
    { text: "É normal" },
    { text: "Falha do farol" },
    { text: "Pneu furado" },
  ]);

  console.log("Seed concluído com sucesso ✅");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
