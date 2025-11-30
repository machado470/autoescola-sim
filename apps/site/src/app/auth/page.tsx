export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-neutral-900 rounded-xl shadow-xl w-80">
        <h2 className="text-xl font-bold mb-4 text-white">Login</h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              className="bg-neutral-800 text-white w-full p-2 rounded"
            />
          </div>

          <div>
            <label className="text-white text-sm">Senha</label>
            <input
              type="password"
              className="bg-neutral-800 text-white w-full p-2 rounded"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
