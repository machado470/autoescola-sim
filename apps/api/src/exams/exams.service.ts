import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Choice = { id: string; text: string; correct?: boolean };
type Question = { id: string; statement: string; choices: Choice[] };

@Injectable()
export class ExamsService {
  private sessions = new Map<
    string,
    { id: string; index: number; total: number; remainingSec: number; questions: Question[] }
  >();

  private mockQuestions: Question[] = [
    {
      id: 'q1',
      statement: 'O que significa a placa R-1 (Parada Obrigatória)?',
      choices: [
        { id: 'a', text: 'Dê preferência à direita' },
        { id: 'b', text: 'Proibido ultrapassar' },
        { id: 'c', text: 'Pare o veículo' },
        { id: 'd', text: 'Siga em frente' },
      ],
    },
    {
      id: 'q2',
      statement: 'Qual a velocidade máxima permitida em via urbana?',
      choices: [
        { id: 'a', text: '40 km/h' },
        { id: 'b', text: '50 km/h' },
        { id: 'c', text: '60 km/h' },
        { id: 'd', text: '70 km/h' },
      ],
    },
  ];

  startSession() {
    const sessionId = randomUUID();
    const questions = [...this.mockQuestions];
    this.sessions.set(sessionId, {
      id: sessionId,
      index: 0,
      total: questions.length,
      remainingSec: 120,
      questions,
    });
    return {
      sessionId,
      question: questions[0],
      index: 0,
      total: questions.length,
      remainingSec: 120,
    };
  }

  submitAnswer(sessionId: string, body: { questionId: string; choiceId: string }) {
    const s = this.sessions.get(sessionId);
    if (!s) throw new Error('Sessão não encontrada');
    // (aqui poderíamos checar correção, salvar resposta etc.)
    s.index += 1;
    const finished = s.index >= s.total;
    return finished
      ? { sessionId, finished: true }
      : {
          sessionId,
          question: s.questions[s.index],
          index: s.index,
          total: s.total,
          remainingSec: s.remainingSec,
        };
  }

  getCurrent(sessionId: string) {
    const s = this.sessions.get(sessionId);
    if (!s) throw new Error('Sessão não encontrada');
    const finished = s.index >= s.total;
    return finished
      ? { sessionId, finished: true }
      : {
          sessionId,
          question: s.questions[s.index],
          index: s.index,
          total: s.total,
          remainingSec: s.remainingSec,
        };
  }
}
