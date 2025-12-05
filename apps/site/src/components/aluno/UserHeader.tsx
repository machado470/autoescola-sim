export default function UserHeader({ name = "Aluno", xp = 120 }) {
  return (
    <div className="bg-white shadow p-4 rounded-xl mb-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-[#4F8DFD] text-white flex items-center justify-center rounded-full font-bold text-lg">
        {name[0]}
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">{name}</h2>
        <p className="text-sm text-gray-600">{xp} XP</p>
      </div>
    </div>
  );
}
