const RATING_LABELS: Record<number, string> = {
  1: "Raw",
  2: "Cut",
  3: "Polished",
  4: "Radiant",
  5: "Perfect Clarity — Marry Me",
};

type Props = {
  rating: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function DiamondRating({ rating, showLabel = false, size = "md" }: Props) {
  const sizeClass = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex gap-0.5 ${sizeClass}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{ color: i <= rating ? "#ff2d78" : "rgba(255,255,255,0.15)" }}
          >
            ◆
          </span>
        ))}
      </div>
      {showLabel && (
        <span className="text-xs tracking-wider uppercase text-white/50 font-sans">
          {RATING_LABELS[rating]}
        </span>
      )}
    </div>
  );
}
