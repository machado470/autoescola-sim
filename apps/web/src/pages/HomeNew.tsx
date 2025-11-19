import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";

export default function HomeNew() {
  const categorias = [
    { id: "sinalizacao", nome: "Sinalização", progresso: 40, cor: "#3b82f6" },
    { id: "defensiva", nome: "Direção Defensiva", progresso: 10, cor: "#10b981" },
    { id: "mecanica", nome: "Mecânica", progresso: 0, cor: "#ec4899" },
    { id: "normas", nome: "Legislação", progresso: 55, cor: "#f59e0b" },
    { id: "socorros", nome: "Primeiros Socorros", progresso: 20, cor: "#8b5cf6" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text px-5 pt-10 pb-20">
      <div className="text-center mb-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/8925/8925846.png"
          className="w-24 h-24 mx-auto mb-3"
        />
        <h1 className="text-2xl font-bold">Bem-vindo(a) ao AutoEscola Sim</h1>
        <p className="text-text2 text-sm mt-1">Treine para passar de primeira</p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Continuar estudo</h2>
        <ProgressBar progress={32} />
        <p className="text-text2 text-sm mt-2">Seu progresso geral</p>

        <Link to="/simulado">
          <Button className="mt-4">Iniciar simulado rápido</Button>
        </Link>
      </Card>

      <h2 className="text-xl font-semibold mt-10 mb-4">Categorias</h2>

      <div className="space-y-3">
        {categorias.map((cat) => (
          <Link key={cat.id} to={`/categoria/${cat.id}`}>
            <div className="bg-card rounded-2xl p-5 border border-border flex items-center gap-4 hover:opacity-90 transition">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: cat.cor }}
              >
                {cat.nome[0]}
              </div>

              <div className="flex-1">
                <p className="font-semibold mb-1">{cat.nome}</p>
                <ProgressBar progress={cat.progresso} />
              </div>

              <span className="text-text2 text-sm">{cat.progresso}%</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
