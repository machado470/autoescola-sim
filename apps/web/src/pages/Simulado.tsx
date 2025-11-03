import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../services/exam';

type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  statement: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  tags: string[];
  choices: Choice[];
};

export default function Simulado() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const question = questions[current];
  const handleSelect = (id: string) => setSelected(id);

  const isCorrect =
    question && selected
      ? question.choices.find((c) => c.id === selected)?.isCorrect ?? null
      : null;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem' }}>
      <h1>Simulado</h1>
      {loading && <p>Carregando perguntas...</p>}
      {!loading && !question && <p>Sem perguntas. Rode o seed. 😅</p>}

      {question && (
        <>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{question.statement}</p>

          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{
              background: '#eef2ff',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.7rem'
            }}>
              {question.difficulty}
            </span>
            {question.tags.map((tag) => (
              <span key={tag} style={{
                background: '#e2e8f0',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.7rem'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}>
            {question.choices.map((choice) => {
              const selectedThis = selected === choice.id;
              let bg = 'white';
              if (selectedThis && isCorrect === true) bg = '#dcfce7';
              if (selectedThis && isCorrect === false) bg = '#fee2e2';

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelect(choice.id)}
                  style={{
                    textAlign: 'left',
                    background: bg,
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.6rem 0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            Pergunta {current + 1} de {questions.length}
          </p>
        </>
      )}
    </div>
  );
}
