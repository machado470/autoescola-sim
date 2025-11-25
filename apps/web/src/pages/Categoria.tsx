import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";

export default function Categoria() {
  const { id } = useParams();

  const categorias: any = {
    sinalizacao: {
      nome: "Sinalização",
      cor: "#3b82f6",
      avatar: "https://cdn-icons-png.flaticon.com/512/8925/8925846.png",
      progresso: 40,
      modulos: [
        { id: 1, nome: "Placas de Advertência", progresso: 100 },
        { id: 2, nome: "Placas de Regulamentação", progresso: 50 },
        { id: 3, nome: "Placas de Indicação", progresso: 0 },
      ],
    },
    defensiva: {
      nome: "Direção Defensiva",
      cor: "#10b981",
      avatar: "https://cdn-icons-png.flaticon.com/512/4329/4329440.png",
      progresso: 10,
      modulos: [
        { id: 1, nome: "Condições Adversas", progresso: 20 },
        { id: 2, nome: "Riscos Comuns", progresso: 0 },
      ],
    },
    mecanica: {
      nome: "Mecânica",
      cor: "#ec4899",
      avatar: "https://cdn-icons-png.flaticon.com/512/685/685352.png",
      progresso: 0,
      modulos: [
        { id: 1, nome: "Motor", progresso: 0 },
        { id: 2, nome: "Sistema de Frenos", progresso: 0 },
      ],
    },
  };

  const cat = categorias[id as keyof typeof categorias];

  if (!cat) return <div className="p-10 text-text">Categoria inválida.</div>;

  return (
    <div className="min-h-screen bg-bg text-text px-6 py-10">
      <div className="text-center mb-8">
        <img src={cat.avatar} className="w-28 h-28 mx-auto mb-3" />
        <h1 className="text-3xl font-bold">{cat.nome}</h1>
        <p className="text-text2 text-sm mt-1">Progresso geral da categoria</p>
      </div>

      <Card>
        <ProgressBar progress={cat.progresso} />
        <p className="text-text2 text-sm mt-2">{cat.progresso}% concluído</p>

        <Link to={`/quiz/${id}`}>
          <Button className="mt-4">Continuar estudo</Button>
        </Link>
      </Card>

      <h2 className="text-xl font-semibold mt-8 mb-4">Módulos</h2>

      <div className="space-y-3">
        {cat.modulos.map((m: any) => (
          <Link key={m.id} to={`/modulo/${id}/${m.id}`}>
            <div className="bg-card p-5 rounded-2xl border border-border hover:opacity-90 transition flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: cat.cor }}
              >
                {m.nome[0]}
              </div>

              <div className="flex-1">
                <p className="font-semibold mb-1">{m.nome}</p>
                <ProgressBar progress={m.progresso} />
              </div>

              <span className="text-text2 text-sm">{m.progresso}%</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
