import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/theme";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SimuladoHome() {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/phases").then((res) => {
      setPhases(res.data);
    });
  }, []);

  return (
    <div
      className={`min-h-screen p-4 pb-24 ${
        theme === "dark" ? "bg-[#111418]" : "bg-[#F7F9FC]"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Escolha uma fase</h2>

      <div className="grid gap-4">
        {phases.map((p: any) => (
          <Card
            key={p.id}
            className="p-4 active:scale-[0.97] transition"
            onClick={() => navigate(`/aluno/simulado/start?phase=${p.id}`)}
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="opacity-70 text-sm">Categoria {p.categoryId}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
