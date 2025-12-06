import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/theme";
import { loginUser } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggle } = useThemeStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    try {
      const user = await loginUser(email, password);
      if (user.role === "STUDENT") navigate("/aluno");
      if (user.role === "ADMIN") navigate("/admin");
    } catch {
      setError("Credenciais inválidas");
    }

    setLoading(false);
  }

  return (
    <div
      className={`
        min-h-screen flex flex-col justify-center p-6
        ${theme === "dark" ? "bg-[#111418] text-gray-100" : "bg-[#F7F9FC] text-gray-900"}
      `}
    >
      <button
        onClick={toggle}
        className="absolute top-4 right-4 px-4 py-2 text-sm rounded-full bg-gray-200 dark:bg-[#1A1D21]"
      >
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>

      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <img src="/logo-cone.png" className="w-20 mx-auto" />
          <h1 className="text-3xl font-bold mt-4">Bem-vindo</h1>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-sm border ${
            theme === "dark"
              ? "bg-[#1A1D21] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#2A2F33] mt-1 mb-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm">Senha</label>
          <input
            type="password"
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#2A2F33] mt-1 mb-6 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#2F80ED] disabled:bg-blue-300 text-white font-semibold"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
