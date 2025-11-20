import Placa from "../components/Placa";

const grupos = [
  { titulo: "Advertência (A)", prefixo: "A", total: 20 },
  { titulo: "Regulamentação (R)", prefixo: "R", total: 15 },
  { titulo: "Indicação (I)", prefixo: "I", total: 10 },
  { titulo: "Obras (OB)", prefixo: "OB", total: 5 },
];

export default function Placas() {
  return (
    <div className="min-h-screen bg-bg text-text p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Placas de Trânsito – Estudo Visual
      </h1>

      {grupos.map((g) => (
        <div key={g.prefixo} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{g.titulo}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: g.total }).map((_, i) => {
              const code = `${g.prefixo}-${i + 1}`;
              return (
                <div
                  key={code}
                  className="flex flex-col items-center bg-surface p-4 rounded-xl border border-border"
                >
                  <Placa code={code} size={90} />
                  <p className="mt-2 text-sm text-text2">{code}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
