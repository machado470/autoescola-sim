export default function GamifiedButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-[#4F8DFD] text-white font-medium shadow hover:scale-105 transition"
    >
      {children}
    </button>
  );
}
