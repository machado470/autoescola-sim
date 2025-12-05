export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 bg-[#6EDC5F] transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
