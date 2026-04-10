// Gold gauge "difficulty meter" — renders an SVG semi-circle gauge
// level: 1 — 5

const LABELS = {
  1: "Effortless",
  2: "Straightforward",
  3: "Moderate",
  4: "Challenging",
  5: "Demanding",
};

export default function DifficultyMeter({ level = 3, label }) {
  const clamped = Math.max(1, Math.min(5, level));
  const percent = (clamped - 0) / 5; // 0..1
  const radius = 90;
  const circumference = Math.PI * radius; // half circle
  const dash = circumference * percent;

  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
        <defs>
          <linearGradient id="goldGauge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A8841F" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="rgba(212,175,55,0.12)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="url(#goldGauge)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {/* Ticks */}
        {[1, 2, 3, 4, 5].map((i) => {
          const angle = Math.PI - (i / 5) * Math.PI;
          const x1 = 110 + Math.cos(angle) * 72;
          const y1 = 110 - Math.sin(angle) * 72;
          const x2 = 110 + Math.cos(angle) * 62;
          const y2 = 110 - Math.sin(angle) * 62;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i <= clamped ? "#D4AF37" : "rgba(212,175,55,0.25)"}
              strokeWidth="2"
            />
          );
        })}
        {/* Center value */}
        <text x="110" y="95" textAnchor="middle" className="fill-cream" style={{ fontFamily: "var(--font-fraunces)", fontSize: "32px", fontWeight: 600 }}>
          {clamped}
          <tspan className="fill-gold" style={{ fontSize: "16px" }}>/5</tspan>
        </text>
      </svg>
      <div className="text-xs tracking-[0.25em] uppercase text-gold mt-1">
        {label || LABELS[clamped]}
      </div>
    </div>
  );
}
