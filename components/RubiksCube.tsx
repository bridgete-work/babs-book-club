"use client";

import { useEffect, useState } from "react";

export default function RubiksCube() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="rubiks-cube"
      aria-hidden="true"
      style={{ top: "12%", right: "5%" }}
    >
      <svg width="96" height="96" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top face */}
        <polygon points="32,2 58,16 32,30 6,16" fill="#f5f500" />
        {/* Top face grid lines */}
        <line x1="19" y1="9" x2="45" y2="23" stroke="#333" strokeWidth="0.8" />
        <line x1="45" y1="9" x2="19" y2="23" stroke="#333" strokeWidth="0.8" />
        <line x1="13" y1="16" x2="51" y2="16" stroke="#333" strokeWidth="0.8" />
        <line x1="32" y1="2" x2="32" y2="30" stroke="#333" strokeWidth="0.8" />

        {/* Left face */}
        <polygon points="6,16 32,30 32,58 6,44" fill="#ff3300" />
        {/* Left face grid lines */}
        <line x1="6" y1="24" x2="32" y2="38" stroke="#333" strokeWidth="0.8" />
        <line x1="6" y1="36" x2="32" y2="50" stroke="#333" strokeWidth="0.8" />
        <line x1="13" y1="20" x2="13" y2="48" stroke="#333" strokeWidth="0.8" />
        <line x1="19" y1="23" x2="19" y2="51" stroke="#333" strokeWidth="0.8" />

        {/* Right face */}
        <polygon points="32,30 58,16 58,44 32,58" fill="#0055ff" />
        {/* Right face grid lines */}
        <line x1="32" y1="38" x2="58" y2="24" stroke="#333" strokeWidth="0.8" />
        <line x1="32" y1="50" x2="58" y2="36" stroke="#333" strokeWidth="0.8" />
        <line x1="45" y1="23" x2="45" y2="51" stroke="#333" strokeWidth="0.8" />
        <line x1="51" y1="20" x2="51" y2="48" stroke="#333" strokeWidth="0.8" />

        {/* Colored squares — top face (3x3) */}
        <polygon points="32,4 43,10 32,16 21,10" fill="#f5f500" stroke="#333" strokeWidth="0.5" />
        <polygon points="21,10 32,16 32,22 20,16" fill="#f0e800" stroke="#333" strokeWidth="0.5" />
        <polygon points="32,16 43,10 44,16 33,22" fill="#ece000" stroke="#333" strokeWidth="0.5" />

        {/* Colored squares — left face (3x3) */}
        <polygon points="8,18 20,24 20,36 8,30" fill="#ff3300" stroke="#333" strokeWidth="0.5" />
        <polygon points="8,30 20,36 20,48 8,42" fill="#e02d00" stroke="#333" strokeWidth="0.5" />
        <polygon points="20,24 32,30 32,42 20,36" fill="#cc2800" stroke="#333" strokeWidth="0.5" />

        {/* Colored squares — right face (3x3) */}
        <polygon points="32,30 44,24 44,36 32,42" fill="#0055ff" stroke="#333" strokeWidth="0.5" />
        <polygon points="44,24 56,18 56,30 44,30" fill="#0044dd" stroke="#333" strokeWidth="0.5" />
        <polygon points="44,36 56,30 56,42 44,48" fill="#0033bb" stroke="#333" strokeWidth="0.5" />

        {/* Outline */}
        <polygon points="32,2 58,16 58,44 32,58 6,44 6,16" fill="none" stroke="#111" strokeWidth="1.5" />
        <line x1="32" y1="2" x2="32" y2="30" stroke="#111" strokeWidth="1" />
        <line x1="6" y1="16" x2="32" y2="30" stroke="#111" strokeWidth="1" />
        <line x1="58" y1="16" x2="32" y2="30" stroke="#111" strokeWidth="1" />
        <line x1="32" y1="30" x2="32" y2="58" stroke="#111" strokeWidth="1" />
      </svg>
    </div>
  );
}
