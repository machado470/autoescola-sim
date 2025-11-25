import { useEffect, useState } from "react";
import axios from "../lib/api";

export default function Simulado() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  if (!questions.length) return null;

  const q = questions[index];

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4">
      <div className="w-full max-w-md bg-[#0A0F1C] p-10 rounded-3xl shadow-[0_0_40px_#00112277]">
        
        <h2 className="text-sm tracking-widest text-green-400 mb-2">
          SIMULADO
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          Questão {index + 1} / {questions.length}
        </p>

        <h1 className="text-xl font-semibold mb-6">
          {q.statement}
        </h1>

        <div className="space-y-3">
          {["A", "B", "C", "D"].map((alt) => (
            <button
              key={alt}
              onClick={next}
              className="w-full bg-[#111827] hover:bg-[#1f2937] text-left p-3 rounded-xl transition"
            >
              <b>{alt}</b> — {q["resposta" + alt]}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIndex(0)}
          className="mt-6 block w-full text-center bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full transition"
        >
          Refazer
        </button>

      </div>
    </div>
  );
}
