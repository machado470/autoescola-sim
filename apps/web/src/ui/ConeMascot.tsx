export default function ConeMascot() {
  return (
    <div className="fixed bottom-4 left-4 opacity-80 pointer-events-none select-none hidden sm:block">
      <svg width="64" height="64" viewBox="0 0 128 128" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb36b"/>
            <stop offset="1" stopColor="#ff7a2f"/>
          </linearGradient>
        </defs>
        <ellipse cx="64" cy="110" rx="40" ry="10" fill="#000" opacity=".08"/>
        <path d="M32 100h64l-20-70H52z" fill="url(#g)" stroke="#c55317" strokeWidth="3" />
        <path d="M52 55h24" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
        <path d="M46 75h36" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
        <circle cx="54" cy="65" r="4" fill="#fff"/>
        <circle cx="74" cy="65" r="4" fill="#fff"/>
      </svg>
    </div>
  );
}
