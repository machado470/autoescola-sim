import { useThemeStore } from "../../store/theme";
import ProgressBar from "../../components/ProgressBar";
import Card from "../../components/Card";

export default function DashboardAluno() {
  const { theme } = useThemeStore();

  const categories = [
    { icon: "/stop.png", name: "Sinalização", level: 60, color: "bg-yellow-400" },
    { icon: "/direcao.png", name: "Direção Defensiva", level: 1, color: "bg-green-500" },
    { icon: "/mecanica.png", name: "Mecânica", level: 20, color: "bg-purple-400" },
  ];

  return (
    <div className={`min-h-screen px-4 pb-24 ${theme === "dark" ? "bg-[#111418] text-gray-100" : "bg-[#F7F9FC]"}`}>
      <button className="w-full py-4 mt-4 rounded-xl bg-[#2F80ED] text-white font-semibold text-lg">
        Iniciar Simulado
      </button>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <Card key={cat.name} className="p-3">
            <img src={cat.icon} className="w-10 h-10 mx-auto mb-2" />
            <p className="text-center text-sm font-semibold">{cat.name}</p>
            <div className="mt-2">
              <ProgressBar value={cat.level} color={cat.color} />
            </div>
            <p className="text-center mt-1 text-xs opacity-70">Nível {cat.level}%</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-4 flex items-center gap-3">
        <img src="/logo-cone.png" className="w-12 h-12" />
        <div className="flex-1">
          <p className="font-semibold">XP</p>
          <ProgressBar value={40} color="bg-green-500" />
          <p className="text-sm opacity-70 mt-1">240 XP</p>
        </div>
      </Card>
    </div>
  );
}
