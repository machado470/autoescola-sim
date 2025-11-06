export default function YieldSign({ size=120 }: { size?: number }) {
  return (
    <svg width={size} height={size*0.9} viewBox="0 0 256 230" role="img" aria-label="Dê a preferência">
      <path d="M128 10L246 220H10L128 10z" fill="#e74b3c" stroke="#b13030" strokeWidth="10"/>
      <path d="M128 35L221 200H35L128 35z" fill="#fff"/>
    </svg>
  );
}
