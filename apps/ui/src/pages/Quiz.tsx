import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL as string;

type Answer = { id:number; text:string; isCorrect:boolean };
type Question = {
  id:number;
  statement:string;
  image:string | null;
  categoryId:number;
  answers: Answer[];
};

export default function Quiz() {
  const token = useAuth(s => s.token);
  const setToken = useAuth(s => s.setToken);
  const [qs, setQs] = useState<Question[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!token) { nav("/"); return; }
    (async () => {
      try {
        setErr(null);
        const { data } = await axios.get<Question[]>(
          `${API}/quiz/random?take=5`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQs(data);
      } catch (e:any) {
        setErr(e?.response?.data?.message || e?.message || "Erro ao carregar quiz");
      }
    })();
  }, [token]);

  function logout() { setToken(null); nav("/"); }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2>Quiz</h2>
        <button onClick={logout}>Sair</button>
      </div>
      {err && <pre style={{ color: "crimson" }}>{String(err)}</pre>}
      {qs.map((q, i) => (
        <div key={q.id} style={{border:"1px solid #ddd", borderRadius:8, padding:16, margin:"12px 0"}}>
          <b>{i+1}. {q.statement}</b>
          <ul>
            {q.answers.map(a => (
              <li key={a.id}>{a.text}</li>
            ))}
          </ul>
        </div>
      ))}
      {!qs.length && !err && <p>Carregando…</p>}
    </div>
  );
}
