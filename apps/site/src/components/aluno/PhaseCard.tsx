import ProgressBar from "./ProgressBar";
import Link from "next/link";

export default function PhaseCard({ id, name, progress }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-[#4F8DFD]">{name}</h3>

      <div className="mt-2">
        <ProgressBar value={progress} />
      </div>

      <Link
        href={`/estudos/fase/${id}`}
        className="mt-3 block bg-[#4F8DFD] text-white text-center py-2 rounded-lg font-medium hover:bg-[#3c79e8]"
      >
        Continuar
      </Link>
    </div>
  );
}
