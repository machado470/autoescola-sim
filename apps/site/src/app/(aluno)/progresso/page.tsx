export default function ProgressoAluno() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Progresso</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-semibold">Sinalização: 60%</p>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-yellow-400 w-[60%] rounded-full"></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-semibold">Direção Defensiva: 1%</p>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-green-400 w-[1%] rounded-full"></div>
        </div>
      </div>

    </div>
  );
}
