export default function SkaterGirl() {
  return (
    <div className="skater-girl" aria-hidden="true">
      <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Skateboard */}
        <rect x="20" y="88" width="80" height="9" rx="4.5" fill="#c9a84c" />
        {/* Wheels */}
        <circle cx="35" cy="101" r="8" fill="#1a1a1a" />
        <circle cx="35" cy="101" r="4" fill="#ff2d78" />
        <circle cx="85" cy="101" r="8" fill="#1a1a1a" />
        <circle cx="85" cy="101" r="4" fill="#ff2d78" />
        {/* Back leg */}
        <line x1="52" y1="72" x2="38" y2="88" stroke="#f4c6a0" strokeWidth="5" strokeLinecap="round" />
        {/* Front leg */}
        <line x1="62" y1="72" x2="72" y2="88" stroke="#f4c6a0" strokeWidth="5" strokeLinecap="round" />
        {/* Body / crop top */}
        <rect x="46" y="45" width="28" height="28" rx="4" fill="#ff2d78" />
        <line x1="46" y1="63" x2="74" y2="63" stroke="#e0196a" strokeWidth="1.5" />
        {/* Arms */}
        <line x1="48" y1="52" x2="30" y2="65" stroke="#f4c6a0" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="72" y1="52" x2="92" y2="44" stroke="#f4c6a0" strokeWidth="4.5" strokeLinecap="round" />
        {/* Neck */}
        <rect x="57" y="36" width="6" height="10" rx="2" fill="#f4c6a0" />
        {/* Head */}
        <ellipse cx="60" cy="27" rx="14" ry="15" fill="#f4c6a0" />
        {/* Hair */}
        <path d="M46 22 C36 18 26 22 22 35 C20 42 22 55 26 60 C30 65 34 62 36 58 C38 54 38 48 40 44 C42 40 44 36 46 32 Z" fill="#f0d060" />
        <path d="M48 14 C52 10 68 10 72 14 C76 18 74 22 72 24 C68 20 52 20 48 24 C46 22 44 18 48 14 Z" fill="#f0d060" />
        <path d="M47 18 C40 16 30 20 26 28 C22 36 24 48 28 54" stroke="#f0d060" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Eyes */}
        <ellipse cx="54" cy="26" rx="2.5" ry="2.5" fill="#2d1a0e" />
        <ellipse cx="66" cy="26" rx="2.5" ry="2.5" fill="#2d1a0e" />
        <circle cx="55.2" cy="25" r="0.8" fill="white" />
        <circle cx="67.2" cy="25" r="0.8" fill="white" />
        {/* Smile */}
        <path d="M55 32 Q60 36 65 32" stroke="#2d1a0e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Sunglasses */}
        <rect x="49" y="23" width="12" height="6" rx="3" fill="#1a1a1a" />
        <rect x="63" y="23" width="12" height="6" rx="3" fill="#1a1a1a" />
        <line x1="61" y1="26" x2="63" y2="26" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="47" y1="25" x2="49" y2="25" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="75" y1="25" x2="78" y2="25" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Skater shoes */}
        <ellipse cx="36" cy="90" rx="8" ry="4" fill="#1a1a1a" />
        <ellipse cx="74" cy="90" rx="8" ry="4" fill="#1a1a1a" />
      </svg>
    </div>
  );
}
