import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menu =
    user.role === "ADMIN"
      ? [
          { name: "Dashboard", path: "/admin/dashboard" },
          { name: "Alunos", path: "/admin/alunos" },
          { name: "Simulados", path: "/admin/simulados" },
        ]
      : [
          { name: "Dashboard", path: "/aluno/dashboard" },
          { name: "Aulas", path: "/aluno/aulas" },
          { name: "Simulados", path: "/aluno/simulados" },
        ];

  return (
    <aside className="w-56 bg-white dark:bg-[#161B22] shadow-md min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">AutoEscola</h2>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="text-left px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1F242C] transition"
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
