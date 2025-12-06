import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/theme";

export default function Start() {
  const navigate = useNavigate();
  const { theme, toggle } = useThemeStore();

  return (
    <div
      className={`
        min-h-screen flex flex-col justify-between p-6
        ${theme === "dark" ? "bg-[#111418] text-gray-100" : "bg-[#F7F9FC] text-gray-900"}
      `}
    >
      <button
        onClick={toggle}
        className="absolute top-4 right-4 px-4 py-2 text-sm rounded-full bg-gray-200 dark:bg-[#1A1D21]"
      >
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>

      <div className="mt-10 text-center">
        <img src="/logo-cone.png" className="w-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">AutoEscola-Sim</h1>

        <p className="text-lg opacity-90 leading-relaxed max-w-md mx-auto">
          Todo motorista começa com um sonho simples: dirigir com segurança e
          liberdade. O AutoEscola-Sim nasceu para transformar esse sonho em
          realidade — do jeito certo. Aqui você treina como se estivesse na
          prova, evolui por fases e descobre onde melhorar. Sem pressão. Sem
          adivinhação. Só você, seu ritmo… e a aprovação chegando cada vez mais
          perto.
        </p>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="py-4 rounded-xl bg-[#2F80ED] text-white font-semibold text-lg w-full"
      >
        Começar Agora
      </button>
    </div>
  );
}
