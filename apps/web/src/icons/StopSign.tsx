export default function StopSign({ size=120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" role="img" aria-label="Parada obrigatória">
      <rect x="40" y="40" width="176" height="176" rx="20" transform="rotate(45 128 128)"
            fill="#d64545" stroke="#b13030" strokeWidth="10"/>
      <rect x="54" y="54" width="148" height="148" rx="16" transform="rotate(45 128 128)"
            fill="none" stroke="#fff" strokeWidth="10"/>
      <text x="128" y="152" textAnchor="middle" fontSize="72" fontWeight="800"
            fill="#fff" fontFamily="system-ui, Arial">STOP</text>
    </svg>
  );
}
