import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "./ToggleThemeButton";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="w-full bg-white dark:bg-[#161B22] shadow flex justify-between items-center px-6 py-4 mb-6">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        AutoEscola Sim
      </h1>

      <div className="flex items-center gap-3">

        <ToggleThemeButton />

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
