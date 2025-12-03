"use client";

import { useEffect, useState } from "react";
import { UsersAPI } from "@/lib/api-users";

export default function UsuariosPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  async function load() {
    const res = await UsersAPI.all();
    setUsers(res.data);
  }

  async function create(e: any) {
    e.preventDefault();
    if (!name || !email || !password) return;

    await UsersAPI.create({ name, email, password, role });
    setName("");
    setEmail("");
    setPassword("");
    setRole("USER");

    load();
  }

  async function remove(id: string) {
    if (!confirm("Remover usuário?")) return;
    await UsersAPI.delete(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      {/* Formulário */}
      <form onSubmit={create} className="flex flex-col gap-3 mb-6 w-[400px]">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="font-semibold text-sm">Tipo:</label>
        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">Aluno</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Criar Usuário
        </button>
      </form>

      {/* Lista */}
      <div className="bg-white rounded shadow p-4">
        {users.length === 0 && <p>Nenhum usuário cadastrado.</p>}

        <ul className="flex flex-col gap-3">
          {users.map((u) => (
            <li
              key={u.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <strong>{u.name}</strong>
                <p className="text-sm">{u.email}</p>
                <p className="text-xs text-gray-500">{u.role}</p>
              </div>

              <button
                onClick={() => remove(u.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

